import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import status from "http-status";
import cron from "node-cron";
import config from "./app/config";
import AppError from "./app/errors/AppError";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
import prisma from "./app/utils/prisma";

const app: Application = express();

app.use(
  cors({
    credentials: true,
    origin:
      config.NODE_ENV === "development"
        ? config.DEV_APP_URL
        : config.PRO_APP_URL,
  }),
);
// parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// run every minute
// cron.schedule("* * * * *", () => {
//   try {
//     AppointmentServices.cancelUnpaidAppointments();
//   } catch (err) {
//     console.error(err);
//     throw new AppError(status.INTERNAL_SERVER_ERROR, "Cron job failed");
//   }
// });

cron.schedule("* * 8 * *", async () => {
  try {
    let minutes = 480; // 8 hours

    const doctors = await prisma.doctor.findMany({});
    for (let i = 0; i < 20; i++) {
      const startDate = new Date();
      startDate.setHours(0, minutes, 0);
      const endDate = new Date();
      endDate.setHours(0, minutes + 30, 0);

      if (!doctors.length) break;
      const exists = await prisma.schedule.findFirst({
        where: {
          startDateTime: startDate,
          endDateTime: endDate,
        },
      });
      if (exists) {
        minutes += 30;
        continue;
      }
      const schedule = await prisma.schedule.create({
        data: {
          startDateTime: startDate,
          endDateTime: endDate,
        },
      });

      for (const doctor of doctors) {
        await prisma.doctorSchedules.create({
          data: {
            doctorId: doctor.id,
            isBooked: false,
            scheduleId: schedule.id,
          },
        });
      }
      minutes += 30;
    }
  } catch (err) {
    console.error(err);
    throw new AppError(status.INTERNAL_SERVER_ERROR, "Cron job failed");
  }
});

// routes
app.get("/health", (req, res) => {
  res.send("Welcome to ph health care prisma server");
});
app.use("/api/v1", router);

app.use(globalErrorHandler);
app.use(notFound);
export default app;

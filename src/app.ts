import express, { Application } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";
import cron from "node-cron";
import { AppointmentServices } from "./app/modules/appointment/appointment.service";
import AppError from "./app/errors/AppError";
import status from "http-status";

const app: Application = express();

app.use(cors());
// parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

cron.schedule("* * * * *", () => {
  try {
    AppointmentServices.cancelUnpaidAppointments();
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

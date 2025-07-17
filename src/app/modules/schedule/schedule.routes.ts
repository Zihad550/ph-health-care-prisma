import express from "express";
import { UserRole } from "../../../generated/prisma";
import auth from "../../middlewares/auth";
import { ScheduleControllers } from "./schedule.controller";

const router = express.Router();

router.get(
  "/",
  auth(UserRole.DOCTOR, UserRole.ADMIN, UserRole.SUPER_ADMIN),
  ScheduleControllers.getAllFromDB,
);
router.get(
  "/doctor/:email",
  auth(UserRole.PATIENT),
  ScheduleControllers.getAllDoctorScheduleFromDB,
);

router.get(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
  ScheduleControllers.getByIdFromDB,
);

router.post(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  ScheduleControllers.inserIntoDB,
);

router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  ScheduleControllers.deleteFromDB,
);

export const ScheduleRoutes = router;

import express from "express";
import { UserRole } from "../../database";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { DoctorControllers } from "./doctor.controller";
import { DoctorValidation } from "./doctor.validation";

const router = express.Router();

// task 3
router.get("/", DoctorControllers.getAllFromDB);

//task 4
router.get("/:id", DoctorControllers.getByIdFromDB);

router.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
  validateRequest(DoctorValidation.update),
  DoctorControllers.updateIntoDB,
);

//task 5
router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  DoctorControllers.deleteFromDB,
);

// task 6
router.delete(
  "/soft/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  DoctorControllers.softDelete,
);

export const DoctorRoutes = router;

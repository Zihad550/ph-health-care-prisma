import express from "express";
import { UserRole } from "../../database";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { PrescriptionControllers } from "./prescription.controller";
import { PrescriptionValidation } from "./prescription.validation";

const router = express.Router();

router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  PrescriptionControllers.getAllFromDB,
);

router.get(
  "/my-prescription",
  auth(UserRole.PATIENT),
  PrescriptionControllers.patientPrescription,
);

router.post(
  "/",
  auth(UserRole.DOCTOR),
  validateRequest(PrescriptionValidation.create),
  PrescriptionControllers.insertIntoDB,
);

export const PrescriptionRoutes = router;

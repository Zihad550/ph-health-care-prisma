import express from "express";
import { PrescriptionControllers } from "./prescription.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { PrescriptionValidation } from "./prescription.validation";
import { UserRole } from "../../../generated/prisma";

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

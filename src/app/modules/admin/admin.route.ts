import express from "express";
import { UserRole } from "../../database";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { AdminController } from "./admin.controller";
import { adminValidationSchemas } from "./admin.validation";

const router = express.Router();

router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminController.getAllFromDB,
);

router.get(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminController.getByIdFromDB,
);

router.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(adminValidationSchemas.update),
  AdminController.updateIntoDB,
);

router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminController.deleteFromDB,
);

router.delete(
  "/soft/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AdminController.softDeleteFromDB,
);

export const AdminRoutes = router;

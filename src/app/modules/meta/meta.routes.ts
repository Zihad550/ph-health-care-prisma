import express from "express";
import { UserRole } from "../../database";
import auth from "../../middlewares/auth";
import { MetaControllers } from "./meta.controller";

const router = express.Router();

router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  MetaControllers.fetchDashboardMetaData,
);

export const MetaRoutes = router;

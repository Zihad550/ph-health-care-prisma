import express from "express";
import { MetaControllers } from "./meta.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma";

const router = express.Router();

router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  MetaControllers.fetchDashboardMetaData,
);

export const MetaRoutes = router;

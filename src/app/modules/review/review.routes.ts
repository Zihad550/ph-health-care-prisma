import express from "express";
import { UserRole } from "../../database";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { ReviewController } from "./review.controller";

import { ReviewValidation } from "./review.validation";

const router = express.Router();

router.get("/", ReviewController.getAllFromDB);

router.post(
  "/",
  auth(UserRole.PATIENT),
  validateRequest(ReviewValidation.create),
  ReviewController.insertIntoDB,
);

export const ReviewRoutes = router;

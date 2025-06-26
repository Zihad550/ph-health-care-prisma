import express, { NextFunction, Request, Response } from "express";
import { SpecialtiesControllers } from "./specialties.controller";
import { SpecialtiesValidtaion } from "./specialties.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma";
import { fileUploader } from "../../utils/fileUploader";

const router = express.Router();

router.get("/", SpecialtiesControllers.getAllFromDB);

router.post(
  "/",
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = SpecialtiesValidtaion.create.parse(JSON.parse(req.body.data));
    next();
  },
  SpecialtiesControllers.inserIntoDB,
);

router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  SpecialtiesControllers.deleteFromDB,
);

export const SpecialtiesRoutes = router;

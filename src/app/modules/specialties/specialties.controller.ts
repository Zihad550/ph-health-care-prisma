import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SpecialtiesServices } from "./specialties.service";

const inserIntoDB = catchAsync(async (req, res) => {
  const result = await SpecialtiesServices.inserIntoDB(req);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Specialties created successfully!",
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req, res) => {
  const result = await SpecialtiesServices.getAllFromDB();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Specialties data fetched successfully",
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SpecialtiesServices.deleteFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Specialty deleted successfully",
    data: result,
  });
});

export const SpecialtiesControllers = {
  inserIntoDB,
  getAllFromDB,
  deleteFromDB,
};

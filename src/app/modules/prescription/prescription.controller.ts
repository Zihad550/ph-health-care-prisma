import status from "http-status";
import { PrescriptionServices } from "./prescription.service";
import { prescriptionFilterableFields } from "./prescription.constants";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import pick from "../../utils/pick";

const insertIntoDB = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await PrescriptionServices.insertIntoDB(user, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Prescription created successfully",
    data: result,
  });
});

const patientPrescription = catchAsync(async (req, res) => {
  const user = req.user;
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await PrescriptionServices.patientPrescription(user, options);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Prescription fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getAllFromDB = catchAsync(async (req, res) => {
  const filters = pick(req.query, prescriptionFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await PrescriptionServices.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Prescriptions retrieval successfully",
    meta: result.meta,
    data: result.data,
  });
});

export const PrescriptionControllers = {
  insertIntoDB,
  patientPrescription,
  getAllFromDB,
};

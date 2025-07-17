import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import pick from "../../utils/pick";
import sendResponse from "../../utils/sendResponse";
import { ScheduleServices } from "./schedule.sevice";

const inserIntoDB = catchAsync(async (req, res) => {
  const result = await ScheduleServices.inserIntoDB(req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Schedule created successfully!",
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req, res) => {
  const filters = pick(req.query, ["startDate", "endDate"]);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const user = req.user;
  const { data, meta } = await ScheduleServices.getAllFromDB(
    filters,
    options,
    user,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Schedule fetched successfully!",
    data,
    meta,
  });
});

const getAllDoctorScheduleFromDB = catchAsync(async (req, res) => {
  const filters = pick(req.query, ["startDate", "endDate"]);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const { data, meta } = await ScheduleServices.getAllDoctorScheduleFromDB(
    filters,
    options,
    req.params.email,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Doctor schedules fetched successfully!",
    data,
    meta,
  });
});

const getByIdFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ScheduleServices.getByIdFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Schedule retrieval successfully",
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ScheduleServices.deleteFromDB(id);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Schedule deleted successfully",
    data: result,
  });
});

export const ScheduleControllers = {
  inserIntoDB,
  getAllFromDB,
  getByIdFromDB,
  deleteFromDB,
  getAllDoctorScheduleFromDB,
};

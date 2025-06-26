import { Request, Response } from "express";
import status from "http-status";
import { DoctorScheduleServices } from "./doctorSchedule.service";
import { scheduleFilterableFields } from "./doctorSchedule.constants";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import pick from "../../utils/pick";

const insertIntoDB = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await DoctorScheduleServices.insertIntoDB(user, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Doctor Schedule created successfully!",
    data: result,
  });
});

const getMySchedule = catchAsync(async (req, res) => {
  const filters = pick(req.query, ["startDate", "endDate", "isBooked"]);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const user = req.user;
  const result = await DoctorScheduleServices.getMySchedule(
    filters,
    options,
    user,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "My Schedule fetched successfully!",
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const result = await DoctorScheduleServices.deleteFromDB(user, id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "My Schedule deleted successfully!",
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req, res) => {
  const filters = pick(req.query, scheduleFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await DoctorScheduleServices.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Doctor Schedule retrieval successfully",
    meta: result.meta,
    data: result.data,
  });
});

export const DoctorScheduleControllers = {
  insertIntoDB,
  getMySchedule,
  deleteFromDB,
  getAllFromDB,
};

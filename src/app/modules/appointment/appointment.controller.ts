import { Request, Response } from "express";
import status from "http-status";
import { AppointmentServices } from "./appointment.service";
import { appointmentFilterableFields } from "./appointment.constant";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import pick from "../../utils/pick";

const createAppointment = catchAsync(async (req, res) => {
  const user = req.user;

  const result = await AppointmentServices.createAppointment(user, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Appointment booked successfully!",
    data: result,
  });
});

const getMyAppointment = catchAsync(async (req, res) => {
  const user = req.user;
  const filters = pick(req.query, ["status", "paymentStatus"]);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await AppointmentServices.getMyAppointment(
    user,
    filters,
    options,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "My Appointment retrive successfully",
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req, res) => {
  const filters = pick(req.query, appointmentFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await AppointmentServices.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Appointment retrieval successfully",
    meta: result.meta,
    data: result.data,
  });
});

const changeAppointmentStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const user = req.user;

  const result = await AppointmentServices.changeAppointmentStatus(
    id,
    status,
    user,
  );
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Appointment status changed successfully",
    data: result,
  });
});

export const AppointmentControllers = {
  createAppointment,
  getMyAppointment,
  getAllFromDB,
  changeAppointmentStatus,
};

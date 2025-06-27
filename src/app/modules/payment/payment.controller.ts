import { PaymentServices } from "./payment.service";
import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const initPayment = catchAsync(async (req, res) => {
  const { appointmentId } = req.params;
  const result = await PaymentServices.initPayment(appointmentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment initiate successfully",
    data: result,
  });
});

const validatePayment = catchAsync(async (req, res) => {
  const result = await PaymentServices.validatePayment(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment validate successfully",
    data: result,
  });
});

export const PaymentControllers = {
  initPayment,
  validatePayment,
};

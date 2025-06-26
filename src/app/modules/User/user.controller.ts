import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

const createAdmin = catchAsync(async (req, res) => {
  const data = await UserServices.createAdmin(req.body);
  sendResponse(res, {
    data,
    statusCode: status.OK,
    success: true,
    message: "Admin created successfully",
  });
});

export const UserControllers = {
  createAdmin,
};

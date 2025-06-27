import { MetaService } from "./meta.service";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
const fetchDashboardMetaData = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await MetaService.fetchDashboardMetaData(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Meta data retrival successfully!",
    data: result,
  });
});

export const MetaControllers = {
  fetchDashboardMetaData,
};

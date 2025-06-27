import status from "http-status";
import { ReviewService } from "./review.service";
import { reviewFilterableFields } from "./review.contant";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import pick from "../../utils/pick";

const insertIntoDB = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await ReviewService.insertIntoDB(user, req.body);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Review created successfully",
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req, res) => {
  const filters = pick(req.query, reviewFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await ReviewService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Reviews retrieval successfully",
    meta: result.meta,
    data: result.data,
  });
});

export const ReviewController = {
  insertIntoDB,
  getAllFromDB,
};

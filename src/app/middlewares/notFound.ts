import { Response, Request } from "express";
import status from "http-status";
import sendResponse from "../utils/sendResponse";
const notFound = (req: Request, res: Response) => {
  sendResponse(res, {
    data: null,
    success: false,
    message: "API not found!!",
    statusCode: status.NOT_FOUND,
  });
};

export default notFound;

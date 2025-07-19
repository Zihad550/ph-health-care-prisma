/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import status from "http-status";
import { JsonWebTokenError } from "jsonwebtoken";
import { Prisma } from "../database";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode: number = status.INTERNAL_SERVER_ERROR;
  const success = false;
  let message = err.message || "Something went wrong!";
  let error = err;

  if (err instanceof Prisma.PrismaClientValidationError) {
    message = "Validation Error";
    error = err.message;
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      message = "Duplicate Key error";
      error = err.meta;
    }
  } else if (err instanceof JsonWebTokenError) {
    statusCode = status.UNAUTHORIZED;
    message = err.message;
    error = err;
  }

  res.status(statusCode).json({
    success,
    message,
    error,
  });
};

export default globalErrorHandler;

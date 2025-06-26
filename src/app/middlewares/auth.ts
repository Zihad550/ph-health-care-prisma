import status from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import catchAsync from "../utils/catchAsync";
import { UserRole } from "../../generated/prisma";
import AppError from "../errors/AppError";
import prisma from "../utils/prisma";

const auth = (...requiredRoles: UserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token)
      throw new AppError(status.UNAUTHORIZED, "You are not authorized!");

    // checking if the given token is valid
    let decoded;
    try {
      decoded = jwt.verify(token, config.JWT_ACCESS_TOKEN_SECRET) as JwtPayload;
    } catch (err) {
      throw new AppError(status.UNAUTHORIZED, "Unauthorized");
    }

    const { role, userId, iat } = decoded;

    // checking if the user is exist
    const user = await prisma.user.findFirst({
      where: { id: userId },
      include: {
        admin: {
          select: {
            isDeleted: true,
          },
        },
      },
    });

    if (!user) throw new AppError(status.NOT_FOUND, "This user is not found !");

    // checking if the user is already deleted

    const isDeleted = user?.admin?.isDeleted;

    if (isDeleted)
      throw new AppError(status.FORBIDDEN, "This user is deleted !");

    if (user.status === "BLOCKED")
      throw new AppError(status.FORBIDDEN, "This user is blocked ! !");

    // if (
    //   user.passwordChangedAt &&
    //   User.isJWTIssuedBeforePasswordChanged(
    //     user.passwordChangedAt,
    //     iat as number,
    //   )
    // )
    //   throw new AppError(status.UNAUTHORIZED, "You are not authorized !");

    if (requiredRoles && !requiredRoles.includes(role))
      throw new AppError(status.UNAUTHORIZED, "You are not authorized  hi!");

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;

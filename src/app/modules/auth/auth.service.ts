import * as bcrypt from "bcrypt";
import { Secret, SignOptions } from "jsonwebtoken";
import status from "http-status";
import prisma from "../../utils/prisma";
import config from "../../config";
import emailSender from "../../utils/emailSender";
import AppError from "../../errors/AppError";
import { jwtUtils } from "../../utils/jwt.utils";
import { UserStatus } from "../../../generated/prisma";

const loginUser = async (payload: { email: string; password: string }) => {
  console.log({ config });
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    userData.password,
  );

  if (!isCorrectPassword) {
    throw new Error("Password incorrect!");
  }
  const accessToken = jwtUtils.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.JWT_ACCESS_TOKEN_SECRET,
    config.JWT_ACCESS_TOKEN_EXPIRES_IN as SignOptions["expiresIn"],
  );

  const refreshToken = jwtUtils.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.JWT_REFRESH_TOKEN_SECRET,
    config.JWT_REFRESH_TOKEN_EXPIRES_IN as SignOptions["expiresIn"],
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtUtils.verifyToken(token, config.JWT_REFRESH_TOKEN_SECRET);
  } catch (err) {
    throw new Error("You are not authorized!");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
      status: UserStatus.ACTIVE,
    },
  });

  const accessToken = jwtUtils.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.JWT_ACCESS_TOKEN_SECRET,
    config.JWT_ACCESS_TOKEN_EXPIRES_IN as SignOptions["expiresIn"],
  );

  return {
    accessToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const changePassword = async (user: any, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password,
  );

  if (!isCorrectPassword) {
    throw new Error("Password incorrect!");
  }

  const hashedPassword: string = await bcrypt.hash(payload.newPassword, 12);

  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashedPassword,
      needPasswordChange: false,
    },
  });

  return {
    message: "Password changed successfully!",
  };
};

const forgotPassword = async (payload: { email: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const resetPassToken = jwtUtils.generateToken(
    { email: userData.email, role: userData.role },
    config.JWT_RESET_PASS_SECRET,
    config.JWT_RESET_PASS_EXPIRES_IN as SignOptions["expiresIn"],
  );
  //console.log(resetPassToken)

  const resetPassLink =
    config.RESET_PASS_LINK + `?userId=${userData.id}&token=${resetPassToken}`;

  await emailSender(
    userData.email,
    `
        <div>
            <p>Dear User,</p>
            <p>Your password reset link
                <a href=${resetPassLink}>
                    <button>
                        Reset Password
                    </button>
                </a>
            </p>

        </div>
        `,
  );
  //console.log(resetPassLink)
};

const resetPassword = async (
  token: string,
  payload: { id: string; password: string },
) => {
  console.log({ token, payload });

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.id,
      status: UserStatus.ACTIVE,
    },
  });

  const isValidToken = jwtUtils.verifyToken(
    token,
    config.JWT_RESET_PASS_SECRET,
  );

  if (!isValidToken) {
    throw new AppError(status.FORBIDDEN, "Forbidden!");
  }

  // hash password
  const password = await bcrypt.hash(payload.password, 12);

  // update into database
  await prisma.user.update({
    where: {
      id: payload.id,
    },
    data: {
      password,
    },
  });
};

export const AuthServices = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
};

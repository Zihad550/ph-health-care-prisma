import { Admin, PrismaClient, User, UserRole } from "../../../generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
interface IPayload {
  password: string;
  admin: Admin;
}
const createAdmin = async (payload: IPayload) => {
  const hashedPassword = await bcrypt.hash(payload.password, 12);

  const data = {
    email: payload.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };
  const result = await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: data,
    });
    const createdAdmin = await tx.admin.create({
      data: payload.admin,
    });
    return createdAdmin;
  });
  return result;
};

export const UserServices = {
  createAdmin,
};

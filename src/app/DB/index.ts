import * as bcrypt from "bcrypt";
import config from "../config";
import { prisma, UserRole } from "../database";

const seedSuperAdmin = async () => {
  try {
    const isExistSuperAdmin = await prisma.user.findFirst({
      where: {
        role: UserRole.SUPER_ADMIN,
      },
    });

    if (isExistSuperAdmin) return;

    const hashedPassword = await bcrypt.hash(config.SUPER_ADMIN_PASSWORD, 12);

    await prisma.user.create({
      data: {
        email: config.SUPER_ADMIN_EMAIL,
        password: hashedPassword,
        role: UserRole.SUPER_ADMIN,
        needPasswordChange: false,
        admin: {
          create: {
            name: config.SUPER_ADMIN_NAME,
            contactNumber: config.SUPER_ADMIN_PHONE,
          },
        },
      },
    });
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
};

export default seedSuperAdmin;

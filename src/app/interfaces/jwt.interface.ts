import { JwtPayload } from "jsonwebtoken";
import { UserRole } from "../../generated/prisma";

export interface IJwtPayload extends JwtPayload {
  email: string;
  role: UserRole;
}

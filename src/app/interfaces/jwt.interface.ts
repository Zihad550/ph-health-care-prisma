import { JwtPayload } from "jsonwebtoken";
import { UserRole } from "../database";

export interface IJwtPayload extends JwtPayload {
  email: string;
  role: UserRole;
}

import { Secret, SignOptions, sign, verify } from "jsonwebtoken";
import { IJwtPayload } from "../interfaces/jwt.interface";

const generateToken = (
  payload: any,
  secret: Secret,
  expiresIn: SignOptions["expiresIn"],
) => {
  const token = sign(payload, secret, {
    expiresIn,
  });

  return token;
};

const verifyToken = (token: string, secret: Secret) => {
  return verify(token, secret) as IJwtPayload;
};

export const jwtUtils = {
  generateToken,
  verifyToken,
};

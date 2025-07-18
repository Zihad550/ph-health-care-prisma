import dotenv from "dotenv";
import path from "path";
import { z, ZodError } from "zod/v4";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.coerce.number().default(8000),
  JWT_ACCESS_TOKEN_SECRET: z.string(),
  JWT_ACCESS_TOKEN_EXPIRES_IN: z.string(),
  JWT_REFRESH_TOKEN_SECRET: z.string(),
  JWT_REFRESH_TOKEN_EXPIRES_IN: z.string(),
  JWT_RESET_PASS_SECRET: z.string(),
  JWT_RESET_PASS_EXPIRES_IN: z.string(),
  RESET_PASS_LINK: z.string(),
  SENDER_EMAIL: z.string(),
  SENDER_APP_PASS: z.string(),
  SSL_STORE_ID: z.string(),
  SSL_STORE_PASS: z.string(),
  SSL_SUCCESS_URL: z.string(),
  SSL_CANCEL_URL: z.string(),
  SSL_FAIL_URL: z.string(),
  SSL_PAYMENT_API: z.string(),
  SSL_VALIDATION_API: z.string(),
  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
  SUPER_ADMIN_EMAIL: z.email(),
  SUPER_ADMIN_PASSWORD: z.string().min(12),
  SUPER_ADMIN_NAME: z.string(),
  SUPER_ADMIN_PHONE: z.string(),
  PRO_APP_URL: z.string(),
  DEV_APP_URL: z.string().default("http://localhost:3000"),
});

try {
  EnvSchema.parse(process.env);
} catch (err) {
  if (err instanceof ZodError) {
    let message = "Missing required values in .env:\n";
    message += Object.keys(z.flattenError(err).fieldErrors).join("\n");
    const e = new Error(message);
    e.stack = "";
    throw e;
  } else console.error(err);
}

export default EnvSchema.parse(process.env);

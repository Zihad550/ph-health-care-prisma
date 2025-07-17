import { z } from "zod/v4";
import { Gender, UserStatus } from "../../database";
const createAdmin = z.object({
  password: z.string(),
  admin: z.object({
    name: z.string(),
    email: z.string(),
    contactNumber: z.string(),
  }),
});

const createDoctor = z.object({
  password: z.string(),
  doctor: z.object({
    name: z.string(),
    email: z.string(),
    contactNumber: z.string(),
    address: z.string().optional(),
    registrationNumber: z.string(),
    experience: z.number().optional(),
    gender: z.enum([Gender.MALE, Gender.FEMALE]),
    appointmentFee: z.number(),
    qualification: z.string(),
    currentWorkingPlace: z.string(),
    designation: z.string(),
  }),
});

const createPatient = z.object({
  password: z.string(),
  patient: z.object({
    email: z.string().email(),
    name: z.string(),
    contactNumber: z.string(),
    address: z.string(),
  }),
});

const updateStatus = z.object({
  body: z.object({
    status: z.enum([UserStatus.ACTIVE, UserStatus.BLOCKED, UserStatus.DELETED]),
  }),
});
export const userValidation = {
  createAdmin,
  createDoctor,
  createPatient,
  updateStatus,
};

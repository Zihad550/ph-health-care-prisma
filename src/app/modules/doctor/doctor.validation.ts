import { z } from "zod/v4";

const create = z.object({
  body: z.object({
    email: z.string(),
    name: z.string(),
    profilePhoto: z.string(),
    contactNumber: z.string(),
    registrationNumber: z.string(),
    experience: z.number(),
    gender: z.string(),
    apointmentFee: z.number(),
    qualification: z.string(),
    currentWorkingPlace: z.string(),
    designation: z.string(),
  }),
});

const update = z.object({
  body: z.object({
    name: z.string().optional(),
    profilePhoto: z.string().optional(),
    contactNumber: z.string().optional(),
    registrationNumber: z.string().optional(),
    experience: z.number().optional(),
    gender: z.string().optional(),
    apointmentFee: z.number().optional(),
    qualification: z.string().optional(),
    currentWorkingPlace: z.string().optional(),
    designation: z.string().optional(),
  }),
});

export const DoctorValidation = {
  create,
  update,
};

import { z } from "zod/v4";

const create = z.object({
  body: z.object({
    appointmentId: z.string({
      error: (issue) =>
        issue.input === undefined
          ? "Appointment Id is required"
          : "Not a string",
    }),
    instructions: z.string({
      error: (issue) =>
        issue.input === undefined ? "Instructions is required" : "Not a string",
    }),
  }),
});

export const PrescriptionValidation = {
  create,
};

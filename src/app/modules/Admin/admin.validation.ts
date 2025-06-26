import { z } from "zod/v4";

const update = z.object({
  body: z.object({
    name: z.string().optional(),
    contactNumber: z.string().optional(),
  }),
});

export const adminValidationSchemas = {
  update,
};

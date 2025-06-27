import { z } from "zod/v4";

const create = z.object({
  body: z.object({
    appointmentId: z.string({
      error: ({ input }) =>
        input ? "Not a string" : "Appointment Id is required",
    }),
    rating: z.number({
      error: ({ input }) => (input ? "Not a string" : "Rating is required"),
    }),
    comment: z.string({
      error: ({ input }) => (input ? "Not a string" : "Comment is required"),
    }),
  }),
});

export const ReviewValidation = {
  create,
};

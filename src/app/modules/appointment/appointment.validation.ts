import { z } from "zod/v4";

const createAppointment = z.object({
  body: z.object({
    doctorId: z.string(),
    scheduleId: z.string(),
  }),
});

export const AppointmentValidation = {
  createAppointment,
};

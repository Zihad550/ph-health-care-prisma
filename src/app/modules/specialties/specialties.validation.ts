import { z } from "zod/v4";

const create = z.object({
  title: z.string(),
});

export const SpecialtiesValidtaion = {
  create,
};

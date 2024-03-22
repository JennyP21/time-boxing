import { z } from "zod";

export const validateBucket = z.object({
  name: z.string().min(3),
  user_id: z.string(),
});

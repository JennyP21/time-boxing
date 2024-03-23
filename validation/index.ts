import { z } from "zod";

export const validateBucket = z.object({
  name: z.string().min(3),
  user_id: z.string(),
});

export const validateTask = z.object({
  user_id: z.string(),
  bucket_id: z.string(),
  title: z.string().min(3),
  start_date: z.date().optional(),
  end_date: z.date().optional(),
  severity: z.enum(["low", "medium", "high", "urgent"]),
  progress: z.enum([
    "Not Started",
    "In Progress",
    "On Hold",
    "Completed",
  ]),
  steps: z.string().array().max(20),
});

export const validatePatchTask = z.object({
  user_id: z.string(),
  bucket_id: z.string().optional(),
  title: z.string().min(3).optional(),
  start_date: z.date().optional(),
  end_date: z.date().optional(),
  severity: z
    .enum(["low", "medium", "high", "urgent"])
    .optional(),
  progress: z
    .enum([
      "Not Started",
      "In Progress",
      "On Hold",
      "Completed",
    ])
    .optional(),
  steps: z.string().array().max(20).optional(),
});

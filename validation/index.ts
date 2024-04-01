import { z } from "zod";

export const validateBucket = z.object({
  name: z.string(),
  user_id: z.string(),
});

export const validateTask = z.object({
  user_id: z.string(),
  bucket_id: z.string(),
  title: z.string().min(3),
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
  showOnCard: z.enum(["steps", "note"]).optional(),
});

export const validatePatchTask = z.object({
  user_id: z.string(),
  bucket_id: z.string().optional(),
  title: z.string().min(3).optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  severity: z
    .enum(["Low", "Medium", "High", "Urgent"])
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
  showOnCard: z.enum(["steps", "note"]).optional(),
});

export const validateLabel = z.object({
  name: z.string().min(3),
});

export const validateStep = z.object({
  task_id: z.string().uuid(),
  value: z.string(),
  order: z.number().positive(),
  checked: z.boolean().optional(),
});

export const validatePatchStep = z.object({
  task_id: z.string().uuid(),
  value: z.string().optional(),
  order: z.number().positive().optional(),
  checked: z.boolean().optional(),
});

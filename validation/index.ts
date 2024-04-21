import { APIParams } from "@/interfaces";
import { NextRequest, NextResponse } from "next/server";
import { validate as UUIDValidate } from "uuid";
import { z } from "zod";

export const validateTeam = z.object({
  name: z.string().min(1, "Team name is required"),
  desc: z
    .string()
    .max(
      2000,
      "Description cannot be more than 2000 characters"
    )
    .optional(),
});

export const validatePatchTeam = z.object({
  name: z
    .string()
    .min(1, "Team name is required")
    .optional(),
  desc: z
    .string()
    .max(
      2000,
      "Description cannot be more than 2000 characters"
    )
    .optional(),
});

export const validateTeamMember = z.object({
  team_id: z.string().uuid("Invalid team id"),
  user_id: z.string(),
  role: z.enum(["owner", "member"]),
});

export const validateAddTeamMember = z.object({
  user_email: z
    .string()
    .email({ message: "Email required" }),
  role: z.enum(["owner", "member"]),
});

export const validateProject = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Project name is required"),
  user_id: z.string().optional(),
  team_id: z.string().optional(),
});

export const validateBucket = z.object({
  name: z.string().trim().min(1, "Bucket name is required"),
  project_id: z.string().uuid("Invalid project id"),
});

export const validateTask = z.object({
  project_id: z.string().uuid("Invalid project id"),
  bucket_id: z.string().uuid("Invalid bucket id"),
  title: z
    .string()
    .min(3, "Title must be atleast 3 charaters"),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
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
  showOnCard: z.enum(["steps", "note"]).optional(),
});

export const validatePatchTask = z.object({
  project_id: z
    .string()
    .uuid("Invalid project id")
    .optional(),
  bucket_id: z
    .string()
    .uuid("Invalid bucket id")
    .optional(),
  title: z
    .string()
    .min(3, "Title must be atleast 3 charaters")
    .optional(),
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
  showOnCard: z.enum(["steps", "note"]).optional(),
});

export const validateLabel = z.object({
  name: z.string().trim().min(1, "Label name is required"),
  project_id: z.string().uuid("Invalid project id"),
});

export const validateStep = z.object({
  task_id: z.string().uuid("Invalid task id"),
  value: z.string().min(1, "Step value is required"),
  order: z.number().positive(),
  checked: z.boolean().optional(),
});

export const validatePatchStep = z.object({
  task_id: z.string().uuid("Invalid task id"),
  value: z
    .string()
    .min(1, "Step value is required")
    .optional(),
  order: z.number().positive().optional(),
  checked: z.boolean().optional(),
});

export const validateLabelAssignment = z.object({
  task_id: z.string().uuid("Invalid task id"),
  label_id: z.string().uuid("Invalid label id"),
});

export const validateUserAssignment = z.object({
  task_id: z.string().uuid("Invalid task id"),
  user_id: z.string(),
});

// Utility function to validate API Requests

export const validateRequestWithParams = (
  handler: (
    request: NextRequest,
    { params }: APIParams
  ) => Promise<NextResponse>
) => {
  return async (
    request: NextRequest,
    { params }: APIParams
  ) => {
    const id = params.id;
    const project_id = params.project_id;
    const member_id = params.member_id;
    if (
      !UUIDValidate(id) ||
      (project_id && !UUIDValidate(project_id)) ||
      (member_id && !UUIDValidate(member_id))
    ) {
      return NextResponse.json("Invalid Id", {
        status: 400,
      });
    } else return await handler(request, { params });
  };
};

export const validateRequest = (
  handler: (request: NextRequest) => Promise<NextResponse>
) => {
  return async (request: NextRequest) => {
    return await handler(request);
  };
};

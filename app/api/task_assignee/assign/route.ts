import { parseZodErr } from "@/components/utils";
import { assignTaskError } from "@/constants";
import { assignUser } from "@/data-access/task_assignees";
import {
  validateRequest,
  validateUserAssignment,
} from "@/validation";
import { NextRequest, NextResponse } from "next/server";

export const POST = validateRequest(
  async (request: NextRequest) => {
    try {
      const data = await request.json();

      const validation =
        validateUserAssignment.safeParse(data);
      if (!validation.success)
        return NextResponse.json(
          parseZodErr(validation.error),
          {
            status: 400,
          }
        );

      const task_assignee = await assignUser(data);

      return NextResponse.json(task_assignee);
    } catch (error) {
      return NextResponse.json(assignTaskError.message, {
        status: 500,
      });
    }
  }
);

import { unexpectedError } from "@/constants";
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
        return NextResponse.json(validation.error.message, {
          status: 400,
        });

      const task_assignee = await assignUser(data);

      return NextResponse.json(task_assignee);
    } catch (error) {
      return NextResponse.json(unexpectedError.message, {
        status: 500,
      });
    }
  }
);

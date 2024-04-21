import { unexpectedError } from "@/constants";
import { unAssignUser } from "@/data-access/task_assignees";
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

      await unAssignUser(data);

      return NextResponse.json([]);
    } catch (error) {
      return NextResponse.json(unexpectedError.message, {
        status: 500,
      });
    }
  }
);

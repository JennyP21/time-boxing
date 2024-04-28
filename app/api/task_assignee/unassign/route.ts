import { parseZodErr } from "@/components/utils";
import { unassignTaskError } from "@/constants";
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
        return NextResponse.json(
          parseZodErr(validation.error),
          {
            status: 400,
          }
        );

      await unAssignUser(data);

      return NextResponse.json([]);
    } catch (error) {
      return NextResponse.json(unassignTaskError.message, {
        status: 500,
      });
    }
  }
);

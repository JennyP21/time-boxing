import { unexpectedError } from "@/constants";
import { unAssignLabel } from "@/data-access/tasks_labels";
import {
  validateLabelAssignment,
  validateRequest,
} from "@/validation";
import { NextRequest, NextResponse } from "next/server";

export const POST = validateRequest(
  async (request: NextRequest) => {
    try {
      const data = await request.json();

      const validation =
        validateLabelAssignment.safeParse(data);
      if (!validation.success)
        return NextResponse.json(validation.error.message, {
          status: 400,
        });

      await unAssignLabel(data);

      return NextResponse.json([]);
    } catch (error) {
      return NextResponse.json(unexpectedError.message, {
        status: 500,
      });
    }
  }
);

import { unexpectedError } from "@/constants";
import { assignLabel } from "@/data-access/tasks_labels";
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

      const task_label = await assignLabel(data);

      return NextResponse.json(task_label);
    } catch (error) {
      return NextResponse.json(unexpectedError.message, {
        status: 500,
      });
    }
  }
);

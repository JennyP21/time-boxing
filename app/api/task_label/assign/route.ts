import { parseZodErr } from "@/components/utils";
import { assignLabelError } from "@/constants";
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
        return NextResponse.json(
          parseZodErr(validation.error),
          {
            status: 400,
          }
        );

      const task_label = await assignLabel(data);

      return NextResponse.json(task_label);
    } catch (error) {
      return NextResponse.json(assignLabelError.message, {
        status: 500,
      });
    }
  }
);

import { getAssigneeError } from "@/constants";
import { getAssigneesByTaskId } from "@/data-access/task";
import { APIParams } from "@/interfaces";
import { validateRequestWithParams } from "@/validation";
import { NextRequest, NextResponse } from "next/server";

export const GET = validateRequestWithParams(
  async (request: NextRequest, { params }: APIParams) => {
    try {
      const task_id = params.id!;

      const assignees = await getAssigneesByTaskId(task_id);

      return NextResponse.json(assignees);
    } catch (error) {
      return NextResponse.json(getAssigneeError.message, {
        status: 500,
      });
    }
  }
);

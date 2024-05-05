import { getTasksError } from "@/constants";
import { getTasksByProjectIds } from "@/data-access/task";
import { validateRequest } from "@/validation";
import { NextRequest, NextResponse } from "next/server";

export const POST = validateRequest(
  async (request: NextRequest) => {
    try {
      const data = await request.json();
      const allTasks = await getTasksByProjectIds(data);
      return NextResponse.json(allTasks);
    } catch (error) {
      return NextResponse.json(getTasksError.message, {
        status: 500,
      });
    }
  }
);

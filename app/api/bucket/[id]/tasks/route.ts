import { getTasksError } from "@/constants";
import { getTasksByBucket } from "@/data-access/task";
import { APIParams } from "@/interfaces";
import { validateRequestWithParams } from "@/validation";
import { NextRequest, NextResponse } from "next/server";

export const GET = validateRequestWithParams(
  async (request: NextRequest, { params }: APIParams) => {
    try {
      const id = params.id!;
      const tasks = await getTasksByBucket(id);
      return NextResponse.json(tasks);
    } catch (error) {
      return NextResponse.json(getTasksError.message, {
        status: 500,
      });
    }
  }
);

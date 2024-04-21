import { unexpectedError } from "@/constants";
import { getTasksByBucket } from "@/data-access/task";
import { validateRequestWithParams } from "@/validation";
import { NextRequest, NextResponse } from "next/server";

export const GET = validateRequestWithParams(
  async (
    request: NextRequest,
    { params }: { params: { id: string } }
  ) => {
    const id = params.id;
    try {
      const tasks = await getTasksByBucket(id);
      return NextResponse.json(tasks);
    } catch (error) {
      return NextResponse.json(unexpectedError.message, {
        status: 500,
      });
    }
  }
);

import { returnIfInvalidateUUID } from "@/validation";
import { getTasksByBucket } from "@/data-access/task";
import { NextRequest, NextResponse } from "next/server";

export const GET = returnIfInvalidateUUID(
  async (
    request: NextRequest,
    { params }: { params: { id: string } }
  ) => {
    const id = params.id;
    try {
      const tasks = await getTasksByBucket(id);
      return NextResponse.json(tasks);
    } catch (error) {
      return NextResponse.json(
        `Unable to get Tasks by Bucket Id ${error}`,
        { status: 404 }
      );
    }
  }
);

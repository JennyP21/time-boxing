import { getTasksByBucket } from "@/data-access/task";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const id = params.id;
  const tasks = await getTasksByBucket(id);

  return NextResponse.json(tasks);
}

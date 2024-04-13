import { getTasksByProjectId } from "@/data-access/task";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const project_id = params.id;

  const tasksByProjectId = await getTasksByProjectId(
    project_id
  );

  return NextResponse.json(tasksByProjectId);
}

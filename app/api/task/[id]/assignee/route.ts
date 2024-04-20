import { getAssigneesByTaskId } from "@/data-access/task";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const task_id = params.id;

  const assignees = await getAssigneesByTaskId(task_id);

  return NextResponse.json(assignees);
}

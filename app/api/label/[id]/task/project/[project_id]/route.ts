import { getTasksByLabelId } from "@/data-access/task";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { id: string; project_id: string };
  }
) {
  const label_id = params.id;
  const project_id = params.project_id;

  const tasks = await getTasksByLabelId(
    label_id,
    project_id
  );

  return NextResponse.json(tasks);
}

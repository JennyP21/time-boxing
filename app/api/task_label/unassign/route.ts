import { unAssignLabel } from "@/data-access/tasks_labels";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await request.json();

  await unAssignLabel(data);

  return NextResponse.json([]);
}

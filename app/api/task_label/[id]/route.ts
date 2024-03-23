import { unAssignLabel } from "@/data-access/tasks-labels";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  await unAssignLabel(id);

  return NextResponse.json([]);
}

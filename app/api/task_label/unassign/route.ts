import { unAssignLabel } from "@/data-access/tasks_labels";
import { validateLabelAssignment } from "@/validation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await request.json();

  const validation =
    validateLabelAssignment.safeParse(data);
  if (!validation.success)
    return NextResponse.json(validation.error.message, {
      status: 400,
    });

  await unAssignLabel(data);

  return NextResponse.json([]);
}

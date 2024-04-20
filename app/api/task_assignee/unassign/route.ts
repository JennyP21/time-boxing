import { unAssignUser } from "@/data-access/task_assignees";
import { validateUserAssignment } from "@/validation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await request.json();

  const validation = validateUserAssignment.safeParse(data);
  if (!validation.success)
    return NextResponse.json(validation.error.message, {
      status: 400,
    });

  await unAssignUser(data);

  return NextResponse.json([]);
}

import { assignLabel } from "@/data-access/tasks-labels";
import { validateLabelAssignment } from "@/validation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const validation =
    validateLabelAssignment.safeParse(data);
  if (!validation.success)
    return NextResponse.json(validation.error.message, {
      status: 400,
    });

  const task_label = await assignLabel(data);

  return NextResponse.json(task_label);
}

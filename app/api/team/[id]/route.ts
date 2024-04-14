import { deleteTeam, updateTeam } from "@/data-access/team";
import { validatePatchTeam } from "@/validation";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await request.json();

  const validation = validatePatchTeam.safeParse(data);

  if (!validation.success) {
    return NextResponse.json(validation.error, {
      status: 400,
    });
  }

  const updatedTeam = await updateTeam(params.id, data);

  return NextResponse.json(updatedTeam);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const team_id = params.id;

  await deleteTeam(team_id);

  return NextResponse.json([]);
}

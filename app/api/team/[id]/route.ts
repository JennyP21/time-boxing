import {
  deleteTeam,
  getTeamById,
  updateTeam,
} from "@/data-access/team";
import { validatePatchTeam } from "@/validation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const team = (await getTeamById(params.id))[0];

  return NextResponse.json(team);
}

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

  const updatedTeam = await updateTeam(params.id, {
    ...data,
    updated_at: new Date(),
  });

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

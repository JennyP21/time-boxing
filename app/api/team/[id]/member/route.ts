import {
  addTeamMember,
  getTeamMembers,
  updateRole,
} from "@/data-access/team";
import { validateTeamMember } from "@/validation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const team_id = params.id;

  const members = await getTeamMembers(team_id);

  return NextResponse.json(members);
}

export async function POST(request: NextRequest) {
  const data = await request.json();

  const validation = validateTeamMember.safeParse(data);

  if (!validation.success) {
    return NextResponse.json(validation.error, {
      status: 400,
    });
  }

  await addTeamMember(data);

  return NextResponse.json([]);
}

export async function PATCH(request: NextRequest) {
  const data = await request.json();

  const validation = validateTeamMember.safeParse(data);

  if (!validation.success)
    return NextResponse.json(validation.error, {
      status: 400,
    });

  await updateRole(data);

  return NextResponse.json([]);
}

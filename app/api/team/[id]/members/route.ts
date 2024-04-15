import { getTeamMembers } from "@/data-access/team";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const team_id = params.id;

  const members = await getTeamMembers(team_id);

  return NextResponse.json(members);
}

import { removeTeamMember } from "@/data-access/team";
import { validateTeamMember } from "@/validation";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string; userid: string };
}

export async function POST(
  request: NextRequest,
  { params }: Props
) {
  const team_id = params.id;
  const user_id = params.userid;

  await removeTeamMember(team_id, user_id);

  return NextResponse.json([]);
}

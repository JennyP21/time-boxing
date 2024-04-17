import { removeTeamMember } from "@/data-access/team";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string; memberid: string };
}

export async function POST(
  request: NextRequest,
  { params }: Props
) {
  const team_id = params.id;
  const user_id = params.memberid;

  await removeTeamMember(team_id, user_id);

  return NextResponse.json([]);
}

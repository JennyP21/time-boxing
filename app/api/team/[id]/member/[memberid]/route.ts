import {
  getOwnersCount,
  removeTeamMember,
} from "@/data-access/team";
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

  const countOfOwners = await getOwnersCount(team_id);
  if (
    countOfOwners.length < 2 &&
    countOfOwners[0].team_members.user_id === user_id
  ) {
    return NextResponse.json(
      "You cannot remove last owner",
      { status: 400 }
    );
  }

  await removeTeamMember(team_id, user_id);

  return NextResponse.json([]);
}

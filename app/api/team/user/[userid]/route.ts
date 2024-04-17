import {
  addTeam,
  getTeamsByUserId,
} from "@/data-access/team";
import { validateTeam } from "@/validation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { userid: string } }
) {
  const userid = params.userid;

  const teamsByUserId = await getTeamsByUserId(userid);

  return NextResponse.json(teamsByUserId);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { userid: string } }
) {
  const userid = params.userid;
  const data = await request.json();

  const validation = validateTeam.safeParse(data);

  if (!validation.success) {
    return NextResponse.json(validation.error, {
      status: 400,
    });
  }

  const newTeam = await addTeam(
    {
      ...data,
      created_at: new Date(),
    },
    userid
  );

  return NextResponse.json(newTeam);
}

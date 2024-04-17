import {
  addTeamMember,
  getTeamMembers,
  updateRole,
} from "@/data-access/team";
import { getUserByEmail } from "@/data-access/user";
import { AddMemberI, TeamMemberI } from "@/interfaces";
import { validateTeamMember } from "@/validation";
import { getServerSession } from "next-auth";
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
  const data: AddMemberI = await request.json();

  // Check the current session of the user
  const session = await getServerSession();

  if (!session)
    return NextResponse.json("Unauthorized access", {
      status: 401,
    });

  // Check if current user is in the team and the user is owner
  const currentMembers = await getTeamMembers(data.team_id);
  if (!verifyMember(session.user.email!, currentMembers)) {
    return NextResponse.json(
      "You are not authorized to make any change",
      {
        status: 401,
      }
    );
  }

  // check if the user with email exists
  const newMember = await getUserByEmail(data.user_email);
  if (!newMember)
    return NextResponse.json("New Member does not exists", {
      status: 404,
    });

  // Check if newMember already exists
  if (isMember(newMember, currentMembers))
    return NextResponse.json("User already exists");

  // create a object to add member
  const newData = {
    team_id: data.team_id,
    user_id: newMember.id,
    role: data.role,
    created_at: new Date(),
  } as TeamMemberI;

  const validation = validateTeamMember.safeParse(newData);

  if (!validation.success) {
    return NextResponse.json(validation.error, {
      status: 400,
    });
  }

  await addTeamMember(newData);

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

const verifyMember = (
  email: string,
  members: any
): boolean => {
  let isOwner = false;
  let isMember = false;

  members.forEach((member: any) => {
    if (member.users.email === email) {
      isMember = true;
      if (member.team_members.role === "owner")
        isOwner = true;
    }
  });

  return isMember && isOwner;
};

const isMember = (newUser: any, members: any) => {
  members.forEach((member: any) => {
    if (member.team_members.user_id === newUser.id)
      return true;
  });

  return false;
};

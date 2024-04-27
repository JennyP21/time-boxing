import {
  alreadyExists,
  getTeamMembersError,
  lastOwnerError,
  notFoundError,
  unAuthorizedError,
  unexpectedError,
} from "@/constants";
import {
  addTeamMember,
  getOwnersCount,
  getTeamMembers,
  updateRole,
} from "@/data-access/team";
import { getUserByEmail } from "@/data-access/user";
import {
  AddMemberI,
  APIParams,
  TeamMemberI,
} from "@/interfaces";
import {
  validateRequest,
  validateRequestWithParams,
  validateTeamMember,
} from "@/validation";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = validateRequestWithParams(
  async (request: NextRequest, { params }: APIParams) => {
    try {
      const team_id = params.id!;

      const members = await getTeamMembers(team_id);

      return NextResponse.json(members);
    } catch (error) {
      return NextResponse.json(
        getTeamMembersError.message,
        {
          status: 500,
        }
      );
    }
  }
);

export const POST = validateRequest(
  async (request: NextRequest) => {
    try {
      const data: AddMemberI = await request.json();

      // Check if current user is in the team and the user is owner
      const session = await getServerSession();
      const currentMembers = await getTeamMembers(
        data.team_id
      );
      if (
        !verifyMember(session!.user.email!, currentMembers)
      ) {
        return NextResponse.json(
          unAuthorizedError.message,
          {
            status: 401,
          }
        );
      }

      // check if the user with email exists
      const newMember = await getUserByEmail(
        data.user_email
      );
      if (!newMember)
        return NextResponse.json(
          notFoundError("Email").message,
          {
            status: 404,
          }
        );

      // Check if newMember already exists
      if (isMember(newMember, currentMembers)) {
        return NextResponse.json(
          alreadyExists("User").message,
          { status: 400 }
        );
      }

      // create a object to add member
      const newData = {
        team_id: data.team_id,
        user_id: newMember.id,
        role: data.role,
        created_at: new Date(),
      } as TeamMemberI;

      const validation =
        validateTeamMember.safeParse(newData);

      if (!validation.success) {
        return NextResponse.json(validation.error, {
          status: 400,
        });
      }

      await addTeamMember(newData);

      return NextResponse.json([]);
    } catch (error) {
      return NextResponse.json(unexpectedError.message, {
        status: 500,
      });
    }
  }
);

export const PATCH = validateRequest(
  async (request: NextRequest) => {
    try {
      const data = await request.json();

      const validation = validateTeamMember.safeParse(data);

      if (!validation.success)
        return NextResponse.json(validation.error, {
          status: 400,
        });

      const countOfOwners = await getOwnersCount(
        data.team_id
      );
      if (
        countOfOwners.length < 2 &&
        countOfOwners[0].team_members.user_id ===
          data.user_id
      ) {
        return NextResponse.json(lastOwnerError.message, {
          status: 400,
        });
      }

      await updateRole(data);

      return NextResponse.json([]);
    } catch (error) {
      return NextResponse.json(unexpectedError.message, {
        status: 500,
      });
    }
  }
);

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
  return members.some(
    (member: any) => newUser.email === member.users.email
  );
};

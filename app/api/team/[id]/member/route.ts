import { parseZodErr } from "@/components/utils";
import {
  getTeamMembersError,
  lastOwnerError,
  updateTeamMemberRoleError,
} from "@/constants";
import {
  getOwnersCount,
  getTeamMembers,
  updateRole,
} from "@/data-access/team";
import { APIParams } from "@/interfaces";
import {
  validateRequest,
  validateRequestWithParams,
  validateTeamMember,
} from "@/validation";
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

export const PATCH = validateRequest(
  async (request: NextRequest) => {
    try {
      const data = await request.json();

      const validation = validateTeamMember.safeParse(data);

      if (!validation.success)
        return NextResponse.json(
          parseZodErr(validation.error),
          {
            status: 400,
          }
        );

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
      return NextResponse.json(
        updateTeamMemberRoleError.message,
        {
          status: 500,
        }
      );
    }
  }
);

export const verifyMember = (
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

export const isMember = (newUser: any, members: any) => {
  return members.some(
    (member: any) => newUser.email === member.users.email
  );
};

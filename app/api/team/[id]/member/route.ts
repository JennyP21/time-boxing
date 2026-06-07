import {
  isMember,
  parseZodErr,
  verifyMember,
} from "@/components/utils";
import {
  addTeamMemberError,
  alreadyExists,
  getTeamMembersError,
  lastOwnerError,
  notFoundError,
  unAuthorizedError,
  updateTeamMemberRoleError,
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
import { verifySession, checkTeamAccess, checkTeamOwner } from "@/lib/apiAuth";
import { NextRequest, NextResponse } from "next/server";

export const GET = validateRequestWithParams(
  async (request: NextRequest, { params }: APIParams) => {
    try {
      const sessionUser = await verifySession();
      if (!sessionUser) {
        return NextResponse.json(unAuthorizedError.message, { status: 401 });
      }

      const team_id = params.id!;
      const isMember = await checkTeamAccess(team_id, sessionUser.id);
      if (!isMember) {
        return NextResponse.json(unAuthorizedError.message, { status: 401 });
      }

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
      const sessionUser = await verifySession();
      if (!sessionUser) {
        return NextResponse.json(unAuthorizedError.message, { status: 401 });
      }

      const data: AddMemberI = await request.json();

      // Check if current user is owner of the team
      const isOwner = await checkTeamOwner(data.team_id, sessionUser.id);
      if (!isOwner) {
        return NextResponse.json(unAuthorizedError.message, { status: 401 });
      }

      const currentMembers = await getTeamMembers(
        data.team_id
      );

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

      // create an object to add member
      const newData = {
        team_id: data.team_id,
        user_id: newMember.id,
        role: data.role,
        created_at: new Date(),
      } as TeamMemberI;

      const validation =
        validateTeamMember.safeParse(newData);

      if (!validation.success) {
        return NextResponse.json(
          parseZodErr(validation.error),
          {
            status: 400,
          }
        );
      }

      await addTeamMember(newData);

      return NextResponse.json([]);
    } catch (error) {
      return NextResponse.json(addTeamMemberError.message, {
        status: 500,
      });
    }
  }
);

export const PATCH = validateRequest(
  async (request: NextRequest) => {
    try {
      const sessionUser = await verifySession();
      if (!sessionUser) {
        return NextResponse.json(unAuthorizedError.message, { status: 401 });
      }

      const data = await request.json();

      const validation = validateTeamMember.safeParse(data);

      if (!validation.success)
        return NextResponse.json(
          parseZodErr(validation.error),
          {
            status: 400,
          }
        );

      // Check if caller is owner of the team
      const isCallerOwner = await checkTeamOwner(data.team_id, sessionUser.id);
      if (!isCallerOwner) {
        return NextResponse.json(unAuthorizedError.message, { status: 401 });
      }

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

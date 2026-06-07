import {
  lastOwnerError,
  notFoundError,
  removeTeamMemberError,
  unAuthorizedError,
} from "@/constants";
import {
  getOwnersCount,
  getTeamMember,
  removeTeamMember,
} from "@/data-access/team";
import { APIParams } from "@/interfaces";
import { validateRequestWithParams } from "@/validation";
import { verifySession, checkTeamOwner } from "@/lib/apiAuth";
import { NextRequest, NextResponse } from "next/server";

export const POST = validateRequestWithParams(
  async (request: NextRequest, { params }: APIParams) => {
    try {
      const sessionUser = await verifySession();
      if (!sessionUser) {
        return NextResponse.json(unAuthorizedError.message, { status: 401 });
      }

      const team_id = params.id!;
      const user_id = params.member_id!;

      // Caller must be an owner OR be the user removing themselves
      if (sessionUser.id !== user_id) {
        const isOwner = await checkTeamOwner(team_id, sessionUser.id);
        if (!isOwner) {
          return NextResponse.json(unAuthorizedError.message, { status: 401 });
        }
      }

      const member = await getTeamMember(team_id, user_id);
      if (!member)
        return NextResponse.json(
          notFoundError("Member").message,
          {
            status: 404,
          }
        );

      const countOfOwners = await getOwnersCount(team_id);
      if (
        countOfOwners.length < 2 &&
        countOfOwners[0].team_members.user_id === user_id
      ) {
        return NextResponse.json(lastOwnerError.message, {
          status: 400,
        });
      }

      await removeTeamMember(team_id, user_id);

      return NextResponse.json([]);
    } catch (error) {
      return NextResponse.json(
        removeTeamMemberError.message,
        {
          status: 500,
        }
      );
    }
  }
);

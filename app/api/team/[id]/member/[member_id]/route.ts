import {
  lastOwnerError,
  notFoundError,
  unexpectedError,
} from "@/constants";
import {
  getOwnersCount,
  getTeamMember,
  removeTeamMember,
} from "@/data-access/team";
import { APIParams } from "@/interfaces";
import { validateRequestWithParams } from "@/validation";
import { NextRequest, NextResponse } from "next/server";

export const POST = validateRequestWithParams(
  async (request: NextRequest, { params }: APIParams) => {
    try {
      const team_id = params.id!;
      const user_id = params.member_id!;

      const member = await getTeamMember(team_id, user_id);
      if (!member)
        return NextResponse.json(notFoundError("Member"), {
          status: 404,
        });

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
      return NextResponse.json(unexpectedError.message, {
        status: 500,
      });
    }
  }
);

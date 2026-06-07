import { getProjectError, unAuthorizedError } from "@/constants";
import { getProjectsByTeamId } from "@/data-access/project";
import { APIParams } from "@/interfaces";
import { validateRequestWithParams } from "@/validation";
import { verifySession, checkTeamAccess } from "@/lib/apiAuth";
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

      const projects = await getProjectsByTeamId(team_id);

      return NextResponse.json(projects);
    } catch (error) {
      return NextResponse.json(getProjectError.message, {
        status: 500,
      });
    }
  }
);

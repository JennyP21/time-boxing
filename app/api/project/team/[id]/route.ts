import { unexpectedError } from "@/constants";
import { getProjectsByTeamId } from "@/data-access/project";
import { APIParams } from "@/interfaces";
import { validateRequestWithParams } from "@/validation";
import { NextRequest, NextResponse } from "next/server";

export const GET = validateRequestWithParams(
  async (request: NextRequest, { params }: APIParams) => {
    try {
      const team_id = params.id!;
      const projects = await getProjectsByTeamId(team_id);

      return NextResponse.json(projects);
    } catch (error) {
      return NextResponse.json(unexpectedError.message, {
        status: 500,
      });
    }
  }
);

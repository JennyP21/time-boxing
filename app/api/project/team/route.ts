import { getProjectError } from "@/constants";
import { getProjectsByTeamIds } from "@/data-access/project";
import { validateRequest } from "@/validation";
import { NextRequest, NextResponse } from "next/server";

export const POST = validateRequest(
  async (request: NextRequest) => {
    try {
      const data = await request.json();
      const projects = await getProjectsByTeamIds(data);

      return NextResponse.json(projects);
    } catch (error) {
      return NextResponse.json(getProjectError.message, {
        status: 500,
      });
    }
  }
);

import { unexpectedError } from "@/constants";
import { getProjectsByUserId } from "@/data-access/project";
import { APIParams } from "@/interfaces";
import { validateRequestWithParams } from "@/validation";
import { NextRequest, NextResponse } from "next/server";

export const GET = validateRequestWithParams(
  async (request: NextRequest, { params }: APIParams) => {
    try {
      const user_id = params.id;
      const projects = await getProjectsByUserId(user_id);

      return NextResponse.json(projects);
    } catch (error) {
      return NextResponse.json(unexpectedError.message, {
        status: 500,
      });
    }
  }
);

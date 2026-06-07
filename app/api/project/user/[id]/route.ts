import { getProjectError, unAuthorizedError } from "@/constants";
import { getProjectsByUserId } from "@/data-access/project";
import { APIParams } from "@/interfaces";
import { validateRequestWithParams } from "@/validation";
import { verifySession } from "@/lib/apiAuth";
import { NextRequest, NextResponse } from "next/server";

export const GET = validateRequestWithParams(
  async (request: NextRequest, { params }: APIParams) => {
    try {
      const sessionUser = await verifySession();
      if (!sessionUser || sessionUser.id !== params.id) {
        return NextResponse.json(unAuthorizedError.message, {
          status: 401,
        });
      }

      const user_id = params.id!;
      const projects = await getProjectsByUserId(user_id);

      return NextResponse.json(projects);
    } catch (error) {
      return NextResponse.json(getProjectError.message, {
        status: 500,
      });
    }
  }
);

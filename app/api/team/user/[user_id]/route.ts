import { parseZodErr } from "@/components/utils";
import { addTeamsError, getTeamsError } from "@/constants";
import {
  addTeam,
  getTeamsByUserId,
} from "@/data-access/team";
import { APIParams } from "@/interfaces";
import {
  validateRequestWithParams,
  validateTeam,
} from "@/validation";
import { NextRequest, NextResponse } from "next/server";

export const GET = validateRequestWithParams(
  async (request: NextRequest, { params }: APIParams) => {
    try {
      const user_id = params.user_id!;

      const teamsByUserId = await getTeamsByUserId(user_id);

      return NextResponse.json(teamsByUserId);
    } catch (error) {
      return NextResponse.json(getTeamsError.message, {
        status: 500,
      });
    }
  }
);

export const POST = validateRequestWithParams(
  async (request: NextRequest, { params }: APIParams) => {
    try {
      const user_id = params.user_id!;
      const data = await request.json();

      const validation = validateTeam.safeParse(data);

      if (!validation.success) {
        return NextResponse.json(
          parseZodErr(validation.error),
          {
            status: 400,
          }
        );
      }

      const newTeam = await addTeam(
        {
          ...data,
          created_at: new Date(),
          updated_at: new Date(),
        },
        user_id
      );

      return NextResponse.json(newTeam);
    } catch (error) {
      return NextResponse.json(addTeamsError.message, {
        status: 500,
      });
    }
  }
);

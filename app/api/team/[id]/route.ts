import {
  notFoundError,
  unexpectedError,
} from "@/constants";
import {
  deleteTeam,
  getTeamById,
  updateTeam,
} from "@/data-access/team";
import { APIParams } from "@/interfaces";
import {
  validatePatchTeam,
  validateRequestWithParams,
} from "@/validation";
import { NextRequest, NextResponse } from "next/server";

export const GET = validateRequestWithParams(
  async (request: NextRequest, { params }: APIParams) => {
    try {
      const team_id = params.id!;
      const team = await getTeamById(team_id);

      return NextResponse.json(team);
    } catch (error) {
      return NextResponse.json(unexpectedError.message, {
        status: 500,
      });
    }
  }
);

export const PATCH = validateRequestWithParams(
  async (request: NextRequest, { params }: APIParams) => {
    try {
      const team_id = params.id!;
      const team = await getTeamById(team_id);
      if (!team)
        return NextResponse.json(notFoundError("Team"), {
          status: 404,
        });

      const data = await request.json();
      const validation = validatePatchTeam.safeParse(data);

      if (!validation.success) {
        return NextResponse.json(validation.error, {
          status: 400,
        });
      }

      const updatedTeam = await updateTeam(team_id, {
        ...data,
        updated_at: new Date(),
      });

      return NextResponse.json(updatedTeam);
    } catch (error) {
      return NextResponse.json(unexpectedError.message, {
        status: 500,
      });
    }
  }
);

export const DELETE = validateRequestWithParams(
  async (request: NextRequest, { params }: APIParams) => {
    try {
      const team_id = params.id!;
      const team = await getTeamById(team_id);
      if (!team)
        return NextResponse.json(notFoundError("Team"), {
          status: 404,
        });

      await deleteTeam(team_id);

      return NextResponse.json([]);
    } catch (error) {
      return NextResponse.json(unexpectedError.message, {
        status: 500,
      });
    }
  }
);

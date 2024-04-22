import { unexpectedError } from "@/constants";
import { getTasksByProjectId } from "@/data-access/task";
import { APIParams } from "@/interfaces";
import { validateRequestWithParams } from "@/validation";
import { NextRequest, NextResponse } from "next/server";

export const GET = validateRequestWithParams(
  async (request: NextRequest, { params }: APIParams) => {
    try {
      const project_id = params.id!;

      const tasksByProjectId = await getTasksByProjectId(
        project_id
      );

      return NextResponse.json(tasksByProjectId);
    } catch (error) {
      return NextResponse.json(unexpectedError.message, {
        status: 500,
      });
    }
  }
);

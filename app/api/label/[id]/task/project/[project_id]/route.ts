import { unexpectedError } from "@/constants";
import { getTasksByLabelId } from "@/data-access/task";
import { APIParams } from "@/interfaces";
import { validateRequestWithParams } from "@/validation";
import { NextRequest, NextResponse } from "next/server";

export const GET = validateRequestWithParams(
  async (request: NextRequest, { params }: APIParams) => {
    try {
      const label_id = params.id;
      const project_id = params.project_id!;

      const tasks = await getTasksByLabelId(
        label_id,
        project_id
      );

      return NextResponse.json(tasks);
    } catch (error) {
      return NextResponse.json(unexpectedError.message, {
        status: 500,
      });
    }
  }
);

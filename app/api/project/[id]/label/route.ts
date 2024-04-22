import { unexpectedError } from "@/constants";
import { getLabelsByProjectId } from "@/data-access/label";
import { APIParams } from "@/interfaces";
import { validateRequestWithParams } from "@/validation";
import { NextRequest, NextResponse } from "next/server";

export const GET = validateRequestWithParams(
  async (request: NextRequest, { params }: APIParams) => {
    try {
      const project_id = params.id!;

      const labelsByProjectId = await getLabelsByProjectId(
        project_id
      );

      return NextResponse.json(labelsByProjectId);
    } catch (error) {
      return NextResponse.json(unexpectedError.message, {
        status: 500,
      });
    }
  }
);

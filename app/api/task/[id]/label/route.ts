import { getLabelsError } from "@/constants";
import { getLabelsByTaskId } from "@/data-access/label";
import { APIParams } from "@/interfaces";
import { validateRequestWithParams } from "@/validation";
import { NextRequest, NextResponse } from "next/server";

export const GET = validateRequestWithParams(
  async (request: NextRequest, { params }: APIParams) => {
    try {
      const id = params.id!;
      const labels = await getLabelsByTaskId(id);

      return NextResponse.json(labels);
    } catch (error) {
      return NextResponse.json(getLabelsError.message, {
        status: 500,
      });
    }
  }
);

import { unexpectedError } from "@/constants";
import { getStepsByTaskId } from "@/data-access/step";
import { APIParams } from "@/interfaces";
import { validateRequestWithParams } from "@/validation";
import { NextRequest, NextResponse } from "next/server";

export const GET = validateRequestWithParams(
  async (request: NextRequest, { params }: APIParams) => {
    try {
      const id = params.id!;
      const steps = await getStepsByTaskId(id);

      return NextResponse.json(steps);
    } catch (error) {
      return NextResponse.json(unexpectedError.message, {
        status: 500,
      });
    }
  }
);

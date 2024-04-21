import { unexpectedError } from "@/constants";
import { addStep } from "@/data-access/step";
import {
  validateRequest,
  validateStep,
} from "@/validation";
import { NextRequest, NextResponse } from "next/server";

export const POST = validateRequest(
  async (request: NextRequest) => {
    try {
      const data = await request.json();

      const validation = validateStep.safeParse(data);
      if (!validation.success)
        return NextResponse.json(validation.error.message, {
          status: 400,
        });

      const newStep = await addStep(data);

      return NextResponse.json(newStep);
    } catch (error) {
      return NextResponse.json(unexpectedError.message, {
        status: 500,
      });
    }
  }
);

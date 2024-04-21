import {
  notFoundError,
  unexpectedError,
} from "@/constants";
import {
  deleteStep,
  getStepById,
  updateStep,
} from "@/data-access/step";
import { APIParams } from "@/interfaces";
import {
  validatePatchStep,
  validateRequestWithParams,
} from "@/validation";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = validateRequestWithParams(
  async (request: NextRequest, { params }: APIParams) => {
    try {
      const id = params.id;

      const step = getStepById(id);
      if (!step) {
        return NextResponse.json(notFoundError("Step"), {
          status: 404,
        });
      }

      const data = await request.json();
      const validation = validatePatchStep.safeParse(data);

      if (!validation.success)
        return NextResponse.json(validation.error.message, {
          status: 400,
        });

      const updatedStep = await updateStep(id, data);

      return NextResponse.json(updatedStep);
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
      const id = params.id;
      const step = getStepById(id);
      if (!step) {
        return NextResponse.json(notFoundError("Step"), {
          status: 404,
        });
      }
      await deleteStep(id);

      return NextResponse.json([]);
    } catch (error) {
      return NextResponse.json(unexpectedError.message, {
        status: 500,
      });
    }
  }
);

import { parseZodErr } from "@/components/utils";
import {
  deleteStepError,
  notFoundError,
  updateStepError,
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
      const id = params.id!;

      const step = getStepById(id);
      if (!step) {
        return NextResponse.json(
          notFoundError("Step").message,
          {
            status: 404,
          }
        );
      }

      const data = await request.json();
      const validation = validatePatchStep.safeParse(data);

      if (!validation.success)
        return NextResponse.json(
          parseZodErr(validation.error),
          {
            status: 400,
          }
        );

      const updatedStep = await updateStep(id, data);

      return NextResponse.json(updatedStep);
    } catch (error) {
      return NextResponse.json(updateStepError.message, {
        status: 500,
      });
    }
  }
);

export const DELETE = validateRequestWithParams(
  async (request: NextRequest, { params }: APIParams) => {
    try {
      const id = params.id!;
      const step = getStepById(id);
      if (!step) {
        return NextResponse.json(
          notFoundError("Step").message,
          {
            status: 404,
          }
        );
      }
      await deleteStep(id);
      return NextResponse.json([]);
    } catch (error) {
      return NextResponse.json(deleteStepError.message, {
        status: 500,
      });
    }
  }
);

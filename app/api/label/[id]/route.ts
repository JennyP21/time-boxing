import {
  notFoundError,
  unexpectedError,
} from "@/constants";
import {
  deleteLabel,
  getLabel,
  updateLabel,
} from "@/data-access/label";
import { APIParams } from "@/interfaces";
import {
  validateLabel,
  validateRequestWithParams,
} from "@/validation";
import { NextRequest, NextResponse } from "next/server";

export const GET = validateRequestWithParams(
  async (request: NextRequest, { params }: APIParams) => {
    try {
      const id = params.id!;
      const label = await getLabel(id);

      return NextResponse.json(label);
    } catch (error) {
      return NextResponse.json(unexpectedError.message, {
        status: 500,
      });
    }
  }
);

export const DELETE = async (
  request: NextRequest,
  { params }: APIParams
) => {
  try {
    const id = params.id!;
    const label = await getLabel(id);
    if (!label)
      return NextResponse.json(notFoundError("Label"), {
        status: 404,
      });

    await deleteLabel(id);
    return NextResponse.json([]);
  } catch (error) {
    return NextResponse.json(unexpectedError.message, {
      status: 500,
    });
  }
};

export const PATCH = async (
  request: NextRequest,
  { params }: APIParams
) => {
  try {
    const id = params.id!;
    const data = await request.json();

    const validation = validateLabel.safeParse(data);
    if (!validation.success)
      return NextResponse.json(validation.error.message, {
        status: 400,
      });

    const updatedLabel = await updateLabel(id, {
      ...data,
      updated_at: new Date(),
    });

    return NextResponse.json(updatedLabel);
  } catch (error) {
    return NextResponse.json(unexpectedError.message, {
      status: 500,
    });
  }
};

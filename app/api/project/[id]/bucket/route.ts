import { unexpectedError } from "@/constants";
import { getBucketsByProjectId } from "@/data-access/bucket";
import { APIParams } from "@/interfaces";
import { validateRequestWithParams } from "@/validation";
import { NextRequest, NextResponse } from "next/server";

export const GET = validateRequestWithParams(
  async (request: NextRequest, { params }: APIParams) => {
    try {
      const project_id = params.id!;

      const bucketsByProjectId =
        await getBucketsByProjectId(project_id);

      return NextResponse.json(bucketsByProjectId);
    } catch (error) {
      return NextResponse.json(unexpectedError.message, {
        status: 500,
      });
    }
  }
);

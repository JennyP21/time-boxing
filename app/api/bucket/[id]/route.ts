import {
  notFoundError,
  unexpectedError,
} from "@/constants";
import {
  deleteBucket,
  getBucket,
  updateBucket,
} from "@/data-access/bucket";
import { BucketI, Params } from "@/interfaces";
import {
  validateBucket,
  validateRequestWithParams,
} from "@/validation";
import { NextRequest, NextResponse } from "next/server";

export const GET = validateRequestWithParams(
  async (request: NextRequest, { params }: Params) => {
    const id = params.id;
    try {
      const bucket = await getBucket(id);
      return NextResponse.json(bucket);
    } catch (error) {
      return NextResponse.json(unexpectedError.message, {
        status: 500,
      });
    }
  }
);

export const DELETE = validateRequestWithParams(
  async (
    request: NextRequest,
    {
      params,
    }: {
      params: { id: string };
    }
  ) => {
    try {
      const id = params.id;
      const bucket = await getBucket(id);
      if (!bucket) {
        return NextResponse.json(notFoundError("Bucket"), {
          status: 400,
        });
      }
      await deleteBucket(id);
      return NextResponse.json([]);
    } catch (error) {
      return NextResponse.json(unexpectedError.message, {
        status: 500,
      });
    }
  }
);

export const PATCH = validateRequestWithParams(
  async (request: NextRequest, { params }: Params) => {
    try {
      const id = params.id;
      const bucket = await getBucket(id);
      if (!bucket) {
        return NextResponse.json(notFoundError("Bucket"), {
          status: 400,
        });
      }
      const data: BucketI = await request.json();

      const validation = validateBucket.safeParse(data);
      if (!validation.success)
        return NextResponse.json(validation.error.message, {
          status: 400,
        });

      const updatedBucket = await updateBucket(id, {
        ...data,
        updated_at: new Date(),
      });

      return NextResponse.json(updatedBucket);
    } catch (error) {
      return NextResponse.json(unexpectedError.message, {
        status: 500,
      });
    }
  }
);

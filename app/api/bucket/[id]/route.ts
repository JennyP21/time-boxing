import { parseZodErr } from "@/components/utils";
import {
  deleteBucketError,
  getBucketsError,
  notFoundError,
  updateBucketError,
} from "@/constants";
import {
  deleteBucket,
  getBucket,
  updateBucket,
} from "@/data-access/bucket";
import { APIParams, BucketI } from "@/interfaces";
import {
  validateBucket,
  validateRequestWithParams,
} from "@/validation";
import { NextRequest, NextResponse } from "next/server";

export const GET = validateRequestWithParams(
  async (request: NextRequest, { params }: APIParams) => {
    const id = params.id!;
    try {
      const bucket = await getBucket(id);
      return NextResponse.json(bucket);
    } catch (error) {
      return NextResponse.json(getBucketsError.message, {
        status: 500,
      });
    }
  }
);

export const DELETE = validateRequestWithParams(
  async (request: NextRequest, { params }: APIParams) => {
    try {
      const id = params.id!;
      const bucket = await getBucket(id);
      if (!bucket) {
        return NextResponse.json(
          notFoundError("Bucket").message,
          {
            status: 404,
          }
        );
      }
      await deleteBucket(id);
      return NextResponse.json([]);
    } catch (error) {
      return NextResponse.json(deleteBucketError.message, {
        status: 500,
      });
    }
  }
);

export const PATCH = validateRequestWithParams(
  async (request: NextRequest, { params }: APIParams) => {
    try {
      const id = params.id!;
      const bucket = await getBucket(id);
      if (!bucket) {
        return NextResponse.json(
          notFoundError("Bucket").message,
          {
            status: 404,
          }
        );
      }
      const data: BucketI = await request.json();

      const validation = validateBucket.safeParse(data);
      if (!validation.success)
        return NextResponse.json(
          parseZodErr(validation.error),
          {
            status: 400,
          }
        );

      const updatedBucket = await updateBucket(id, {
        ...data,
        updated_at: new Date(),
      });

      return NextResponse.json(updatedBucket);
    } catch (error) {
      return NextResponse.json(updateBucketError.message, {
        status: 500,
      });
    }
  }
);

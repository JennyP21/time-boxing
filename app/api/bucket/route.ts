import { unexpectedError } from "@/constants";
import { addBucket } from "@/data-access/bucket";
import { BucketI } from "@/interfaces";
import {
  validateBucket,
  validateRequest,
} from "@/validation";
import { NextRequest, NextResponse } from "next/server";

export const POST = validateRequest(
  async (request: NextRequest) => {
    try {
      const data: BucketI = await request.json();

      const validation = validateBucket.safeParse(data);

      if (!validation.success)
        return NextResponse.json(validation.error.message, {
          status: 400,
        });

      const newBucket = await addBucket({
        ...data,
        created_at: new Date(),
        updated_at: new Date(),
      });

      return NextResponse.json(newBucket, {
        status: 200,
      });
    } catch (error) {
      return NextResponse.json(unexpectedError.message, {
        status: 500,
      });
    }
  }
);

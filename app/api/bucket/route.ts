import { parseZodErr } from "@/components/utils";
import { addBucketError } from "@/constants";
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
        return NextResponse.json(
          parseZodErr(validation.error),
          {
            status: 400,
          }
        );

      const newBucket = await addBucket({
        ...data,
        created_at: new Date(),
        updated_at: new Date(),
      });

      return NextResponse.json(newBucket);
    } catch (error) {
      return NextResponse.json(addBucketError.message, {
        status: 500,
      });
    }
  }
);

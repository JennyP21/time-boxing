import {
  addBucket,
  getBuckets,
} from "@/data-access/bucket";
import { validateBucket } from "@/validation/bucketValidation";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const buckets = await getBuckets();

  return NextResponse.json(buckets);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
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
}

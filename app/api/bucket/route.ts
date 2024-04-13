import {
  addBucket,
  getBuckets,
} from "@/data-access/bucket";
import { BucketI } from "@/interfaces";
import { validateBucket } from "@/validation";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const buckets = await getBuckets();

  return NextResponse.json(buckets);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  const data: BucketI = await request.json();

  if (!session)
    return NextResponse.json("Unauthorized access", {
      status: 401,
    });

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

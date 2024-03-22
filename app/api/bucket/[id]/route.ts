import {
  deleteBucket,
  getBucket,
  updateBucket,
} from "@/data-access/bucket";
import { validateBucket } from "@/validation/bucketValidation";
import { NextRequest } from "next/dist/server/web/spec-extension/request";
import { NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const id = params.id;
  const bucket = await getBucket(id);

  return NextResponse.json(bucket);
}

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const id = params.id;
  await deleteBucket(id);

  return NextResponse.json([]);
}

export async function PATCH(
  request: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const id = params.id;
  const data = await request.json();
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
}

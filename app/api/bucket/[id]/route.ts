import {
  deleteBucket,
  getBucket,
  updateBucket,
} from "@/data-access/bucket";
import { getUserById } from "@/data-access/user";
import { Bucket } from "@/interfaces";
import { validateBucket } from "@/validation";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

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

  const bucket = await getBucket(id);
  if (!bucket) {
    return NextResponse.json("Invalid bucket id", {
      status: 400,
    });
  }

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

  const bucket = await getBucket(id);
  if (!bucket) {
    return NextResponse.json("Invalid bucket id", {
      status: 400,
    });
  }

  const session = await getServerSession();
  const data: Bucket = await request.json();

  if (!session)
    return NextResponse.json("Unauthorized access", {
      status: 401,
    });

  const validation = validateBucket.safeParse(data);

  if (!validation.success)
    return NextResponse.json(validation.error.message, {
      status: 400,
    });

  const user = await getUserById(data.user_id);
  if (session.user.email !== user.email) {
    return NextResponse.json("Invalid user id", {
      status: 400,
    });
  }

  const updatedBucket = await updateBucket(id, {
    ...data,
    updated_at: new Date(),
  });

  return NextResponse.json(updatedBucket);
}

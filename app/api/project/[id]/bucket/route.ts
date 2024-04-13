import { getBucketsByProjectId } from "@/data-access/bucket";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const project_id = params.id;

  const bucketsByProjectId = await getBucketsByProjectId(
    project_id
  );

  return NextResponse.json(bucketsByProjectId);
}

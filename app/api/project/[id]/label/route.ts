import { getLabelsByProjectId } from "@/data-access/label";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const project_id = params.id;

  const labelsByProjectId = await getLabelsByProjectId(
    project_id
  );

  return NextResponse.json(labelsByProjectId);
}

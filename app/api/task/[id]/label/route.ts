import { getLabelsByTaskId } from "@/data-access/label";
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
  const labels = await getLabelsByTaskId(id);

  return NextResponse.json(labels);
}

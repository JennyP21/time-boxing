import { getStepsByTaskId } from "@/data-access/step";
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
  const steps = await getStepsByTaskId(id);

  return NextResponse.json(steps);
}

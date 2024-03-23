import { assignLabel } from "@/data-access/tasks-labels";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();

  await assignLabel(data);

  return NextResponse.json([]);
}

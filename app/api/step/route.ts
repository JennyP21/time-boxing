import { addStep } from "@/data-access/step";
import { validateStep } from "@/validation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const data = await request.json();

  const validation = validateStep.safeParse(data);

  if (!validation.success)
    return NextResponse.json(validation.error.message, {
      status: 400,
    });

  const newStep = await addStep(data);

  return NextResponse.json(newStep);
}

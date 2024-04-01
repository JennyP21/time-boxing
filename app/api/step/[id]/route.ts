import { deleteStep, updateStep } from "@/data-access/step";
import { validatePatchStep } from "@/validation";
import { NextRequest, NextResponse } from "next/server";

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

  const validation = validatePatchStep.safeParse(data);

  if (!validation.success)
    return NextResponse.json(validation.error.message, {
      status: 400,
    });

  const updatedStep = await updateStep(id, data);

  return NextResponse.json(updatedStep);
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
  await deleteStep(id);

  return NextResponse.json([]);
}

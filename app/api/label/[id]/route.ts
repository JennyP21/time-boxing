import {
  deleteLabel,
  getLabel,
  updateLabel,
} from "@/data-access/label";
import { validateLabel } from "@/validation";
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
  const label = await getLabel(id);

  return NextResponse.json(label);
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
  await deleteLabel(id);

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
  const validation = validateLabel.safeParse(data);

  if (!validation.success)
    return NextResponse.json(validation.error.message, {
      status: 400,
    });
  const updatedLabel = await updateLabel(id, {
    ...data,
    updated_at: new Date(),
  });

  return NextResponse.json(updatedLabel);
}

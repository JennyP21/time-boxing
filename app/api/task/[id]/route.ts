import {
  deleteTask,
  getTask,
  updateTask,
} from "@/data-access/task";
import { validatePatchTask } from "@/validation";
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
  const task = await getTask(id);

  return NextResponse.json(task);
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
  await deleteTask(id);

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
  const validation = validatePatchTask.safeParse(data);
  console.log(data);

  if (!validation.success)
    return NextResponse.json(validation.error.message, {
      status: 400,
    });
  const updatedTask = await updateTask(id, {
    ...data,
    updated_at: new Date(),
  });

  return NextResponse.json(updatedTask);
}

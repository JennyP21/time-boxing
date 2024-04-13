import { addTask } from "@/data-access/task";
import { validateTask } from "@/validation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const validation = validateTask.safeParse(data);

  if (!validation.success)
    return NextResponse.json(validation.error.message, {
      status: 400,
    });

  const newTask = await addTask({
    ...data,
    created_at: new Date(),
    updated_at: new Date(),
  });

  return NextResponse.json(newTask, {
    status: 200,
  });
}

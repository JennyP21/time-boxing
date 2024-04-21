import { unexpectedError } from "@/constants";
import { addTask } from "@/data-access/task";
import {
  validateRequest,
  validateTask,
} from "@/validation";
import { NextRequest, NextResponse } from "next/server";

export const POST = validateRequest(
  async (request: NextRequest) => {
    try {
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
    } catch (error) {
      return NextResponse.json(unexpectedError.message, {
        status: 500,
      });
    }
  }
);

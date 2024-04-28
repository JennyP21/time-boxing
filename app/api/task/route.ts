import { parseZodErr } from "@/components/utils";
import { addTaskError } from "@/constants";
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
        return NextResponse.json(
          parseZodErr(validation.error),
          {
            status: 400,
          }
        );

      const newTask = await addTask({
        ...data,
        created_at: new Date(),
        updated_at: new Date(),
      });

      return NextResponse.json(newTask);
    } catch (error) {
      return NextResponse.json(addTaskError.message, {
        status: 500,
      });
    }
  }
);

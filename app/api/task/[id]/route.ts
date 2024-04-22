import {
  notFoundError,
  unexpectedError,
} from "@/constants";
import {
  deleteTask,
  getTask,
  updateTask,
} from "@/data-access/task";
import { APIParams } from "@/interfaces";
import {
  validatePatchTask,
  validateRequestWithParams,
} from "@/validation";
import { NextRequest, NextResponse } from "next/server";

export const GET = validateRequestWithParams(
  async (request: NextRequest, { params }: APIParams) => {
    try {
      const id = params.id!;
      const task = await getTask(id);

      return NextResponse.json(task);
    } catch (error) {
      return NextResponse.json(unexpectedError.message, {
        status: 500,
      });
    }
  }
);

export const DELETE = validateRequestWithParams(
  async (request: NextRequest, { params }: APIParams) => {
    try {
      const id = params.id!;
      const task = await getTask(id);
      if (!task)
        return NextResponse.json(notFoundError("Task"), {
          status: 404,
        });

      await deleteTask(id);

      return NextResponse.json([]);
    } catch (error) {
      return NextResponse.json(unexpectedError.message, {
        status: 500,
      });
    }
  }
);

export const PATCH = validateRequestWithParams(
  async (request: NextRequest, { params }: APIParams) => {
    try {
      const id = params.id!;
      const task = await getTask(id);
      if (!task)
        return NextResponse.json(notFoundError("Task"), {
          status: 404,
        });

      const data = await request.json();
      const validation = validatePatchTask.safeParse(data);

      if (!validation.success)
        return NextResponse.json(validation.error.message, {
          status: 400,
        });
      const updatedTask = await updateTask(id, {
        ...data,
        updated_at: new Date(),
      });

      return NextResponse.json(updatedTask);
    } catch (error) {
      return NextResponse.json(unexpectedError.message, {
        status: 500,
      });
    }
  }
);

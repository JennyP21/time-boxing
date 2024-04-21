import { unexpectedError } from "@/constants";
import { addProject } from "@/data-access/project";
import { ProjectI } from "@/interfaces";
import {
  validateProject,
  validateRequest,
} from "@/validation";
import { NextRequest, NextResponse } from "next/server";

export const POST = validateRequest(
  async (request: NextRequest) => {
    try {
      const data: ProjectI = await request.json();

      const validation = validateProject.safeParse(data);

      if (!validation.success)
        return NextResponse.json(validation.error.message, {
          status: 400,
        });

      const newProject = await addProject({
        ...data,
        created_at: new Date(),
        updated_at: new Date(),
      });

      return NextResponse.json(newProject);
    } catch (error) {
      return NextResponse.json(unexpectedError.message, {
        status: 500,
      });
    }
  }
);

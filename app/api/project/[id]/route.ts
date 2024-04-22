import {
  notFoundError,
  unexpectedError,
} from "@/constants";
import {
  deleteProject,
  getProject,
  updateProject,
} from "@/data-access/project";
import { getUserById } from "@/data-access/user";
import { APIParams, ProjectI } from "@/interfaces";
import {
  validateProject,
  validateRequestWithParams,
} from "@/validation";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = validateRequestWithParams(
  async (request: NextRequest, { params }: APIParams) => {
    try {
      const id = params.id!;
      const project = await getProject(id);
      return NextResponse.json(project);
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
      const project = await getProject(id);
      if (!project) {
        return NextResponse.json(notFoundError("Project"), {
          status: 404,
        });
      }
      await deleteProject(id);
      return NextResponse.json([]);
    } catch (error) {
      return NextResponse.json(unexpectedError.message, {
        status: 500,
      });
    }
  }
);

export async function PATCH(
  request: NextRequest,
  { params }: APIParams
) {
  try {
    const id = params.id!;
    const project = await getProject(id);
    if (!project) {
      return NextResponse.json(notFoundError("Project"), {
        status: 404,
      });
    }

    const data: ProjectI = await request.json();
    const validation = validateProject.safeParse(data);

    if (!validation.success)
      return NextResponse.json(validation.error.message, {
        status: 400,
      });

    const user = await getUserById(data.user_id);
    const session = await getServerSession();
    if (session && session.user.email !== user.email) {
      return NextResponse.json(notFoundError("User"), {
        status: 404,
      });
    }

    const updatedProject = await updateProject(id, {
      ...data,
      updated_at: new Date(),
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    return NextResponse.json(unexpectedError.message, {
      status: 500,
    });
  }
}

import {
  deleteProject,
  getProject,
  updateProject,
} from "@/data-access/project";
import { getUserById } from "@/data-access/user";
import { ProjectI } from "@/interfaces";
import { validateProject } from "@/validation";
import { getServerSession } from "next-auth";
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
  const project = await getProject(id);

  return NextResponse.json(project);
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

  const project = await getProject(id);
  if (!project) {
    return NextResponse.json("Invalid project id", {
      status: 400,
    });
  }

  await deleteProject(id);

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

  const project = await getProject(id);
  if (!project) {
    return NextResponse.json("Invalid project id", {
      status: 400,
    });
  }

  const session = await getServerSession();
  const data: ProjectI = await request.json();

  if (!session)
    return NextResponse.json("Unauthorized access", {
      status: 401,
    });

  const validation = validateProject.safeParse(data);

  if (!validation.success)
    return NextResponse.json(validation.error.message, {
      status: 400,
    });

  const user = await getUserById(data.user_id);
  if (session.user.email !== user.email) {
    return NextResponse.json("Invalid user id", {
      status: 400,
    });
  }

  const updatedProject = await updateProject(id, {
    ...data,
    updated_at: new Date(),
  });

  return NextResponse.json(updatedProject);
}

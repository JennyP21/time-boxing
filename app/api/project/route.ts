import { addProject } from "@/data-access/project";
import { getUserById } from "@/data-access/user";
import { ProjectI } from "@/interfaces";
import { validateProject } from "@/validation";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
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

  const newProject = await addProject({
    ...data,
    created_at: new Date(),
    updated_at: new Date(),
  });

  return NextResponse.json(newProject, {
    status: 200,
  });
}

import { db } from "@/drizzle";
import { projects } from "@/drizzle/schema";
import { ProjectI } from "@/interfaces";
import { eq } from "drizzle-orm";

export async function getProject(id: string) {
  const result = await db
    .select()
    .from(projects)
    .where(eq(projects.id, id));

  return result[0];
}

export async function getProjectsByUserId(user_id: string) {
  const result = await db
    .select()
    .from(projects)
    .where(eq(projects.user_id, user_id));

  return result;
}

export async function getProjectsByTeamId(team_id: string) {
  const result = await db
    .select()
    .from(projects)
    .where(eq(projects.team_id, team_id));

  return result;
}

export async function addProject(project: ProjectI) {
  const newProject = await db
    .insert(projects)
    .values(project)
    .returning();

  return newProject;
}

export async function updateProject(
  id: string,
  project: ProjectI
) {
  const updatedProject = await db
    .update(projects)
    .set(project)
    .where(eq(projects.id, id))
    .returning();

  return updatedProject;
}

export async function deleteProject(id: string) {
  await db.delete(projects).where(eq(projects.id, id));

  return [];
}

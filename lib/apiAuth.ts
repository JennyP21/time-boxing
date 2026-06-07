import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import { getProject } from "@/data-access/project";
import { getTeamMember } from "@/data-access/team";
import { getTask } from "@/data-access/task";

/**
 * Retrieves and validates the active session, returning the logged-in user details if valid.
 */
export async function verifySession() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return null;
  }
  return session.user;
}

/**
 * Verifies if the specified user has access to the project.
 * A user has access if they are the direct owner or are a member of the team linked to the project.
 */
export async function checkProjectAccess(projectId: string, userId: string): Promise<boolean> {
  const project = await getProject(projectId);
  if (!project) return false;

  if (project.user_id === userId) return true;

  if (project.team_id) {
    const member = await getTeamMember(project.team_id, userId);
    if (member) return true;
  }

  return false;
}

/**
 * Verifies if the specified user has access to the task.
 * Task access is derived from the user's access permissions on the task's project.
 */
export async function checkTaskAccess(taskId: string, userId: string): Promise<boolean> {
  const taskResult = await getTask(taskId);
  const task = taskResult[0];
  if (!task || !task.project_id) return false;
  return checkProjectAccess(task.project_id, userId);
}

/**
 * Verifies if the specified user is a member of the team.
 */
export async function checkTeamAccess(teamId: string, userId: string): Promise<boolean> {
  const member = await getTeamMember(teamId, userId);
  return !!member;
}

/**
 * Verifies if the specified user is an owner of the team.
 */
export async function checkTeamOwner(teamId: string, userId: string): Promise<boolean> {
  const member = await getTeamMember(teamId, userId);
  return member?.role === "owner";
}

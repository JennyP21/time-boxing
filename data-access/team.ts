import { db } from "@/drizzle";
import { team_members, teams } from "@/drizzle/schema";
import { TeamI, TeamMemberI } from "@/interfaces";
import { and, eq } from "drizzle-orm";

export async function getTeamsByUserId(user_id: string) {
  const teamsByUserId = await db
    .select()
    .from(teams)
    .leftJoin(
      team_members,
      eq(teams.id, team_members.team_id)
    )
    .where(eq(team_members.user_id, user_id));

  return teamsByUserId;
}

export async function addTeam(
  team: TeamI,
  user_id: string
) {
  const result = await db.transaction(async (tx) => {
    const newTeam = (
      await tx.insert(teams).values(team).returning()
    )[0];
    const member = {
      team_id: newTeam.id,
      user_id: user_id,
      role: "owner",
    } as TeamMemberI;
    await tx.insert(team_members).values(member);

    return newTeam;
  });

  return result;
}

export async function updateTeam(team: TeamI) {
  const updatedTeam = await db
    .update(teams)
    .set(team)
    .returning();

  return updatedTeam;
}

export async function addTeamMember(
  teamMember: TeamMemberI
) {
  await db
    .insert(team_members)
    .values(teamMember)
    .returning();
}

export async function removeTeamMember(
  team_id: string,
  user_id: string
) {
  await db
    .delete(team_members)
    .where(
      and(
        eq(team_members.team_id, team_id),
        eq(team_members.user_id, user_id)
      )
    );
}

export async function updateRole(teamMember: TeamMemberI) {
  const updatedMember = db
    .update(team_members)
    .set(teamMember)
    .returning();

  return updatedMember;
}

export async function deleteTeam(team_id: string) {
  await db.delete(teams).where(eq(teams.id, team_id));
}
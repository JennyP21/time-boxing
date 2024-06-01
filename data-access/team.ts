import { db } from "@/drizzle";
import {
  team_members,
  teams,
  users,
} from "@/drizzle/schema";
import { TeamI, TeamMemberI } from "@/interfaces";
import { and, eq } from "drizzle-orm";

export async function getTeamsByUserId(user_id: string) {
  const teamsByUserId = await db
    .select({ teams })
    .from(teams)
    .leftJoin(
      team_members,
      eq(teams.id, team_members.team_id)
    )
    .where(eq(team_members.user_id, user_id));

  return teamsByUserId.length > 0
    ? teamsByUserId.map((item) => item.teams)
    : [];
}

export async function getTeamById(team_id: string) {
  const team = await db
    .select()
    .from(teams)
    .where(eq(teams.id, team_id));

  return team[0];
}

export async function getTeamMembers(team_id: string) {
  let teamMembers = await db
    .select({ team_members, users })
    .from(team_members)
    .leftJoin(teams, eq(team_members.team_id, teams.id))
    .fullJoin(users, eq(team_members.user_id, users.id))
    .where(eq(team_members.team_id, team_id));

  return teamMembers;
}

export async function getOwnersCount(team_id: string) {
  const countOfOwners = await db
    .select({ team_members })
    .from(team_members)
    .leftJoin(teams, eq(team_members.team_id, teams.id))
    .where(
      and(
        eq(team_members.team_id, team_id),
        eq(team_members.role, "owner")
      )
    );

  return countOfOwners;
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
      created_at: new Date(),
    } as TeamMemberI;
    await tx.insert(team_members).values(member);

    return newTeam;
  });

  return result;
}

export async function updateTeam(
  team_id: string,
  team: TeamI
) {
  const updatedTeam = await db
    .update(teams)
    .set(team)
    .where(eq(teams.id, team_id))
    .returning();

  return updatedTeam;
}

export async function addTeamMember(
  teamMember: TeamMemberI
) {
  await db.insert(team_members).values(teamMember);
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

export async function getTeamMember(
  team_id: string,
  user_id: string
) {
  const result = await db
    .select()
    .from(team_members)
    .where(
      and(
        eq(team_members.team_id, team_id),
        eq(team_members.user_id, user_id)
      )
    );
  return result[0];
}

export async function updateRole(teamMember: TeamMemberI) {
  const updatedMember = db
    .update(team_members)
    .set(teamMember)
    .where(
      and(
        eq(team_members.team_id, teamMember.team_id),
        eq(team_members.user_id, teamMember.user_id)
      )
    )
    .returning();

  return updatedMember;
}

export async function deleteTeam(team_id: string) {
  await db.delete(teams).where(eq(teams.id, team_id));
}

import { db } from "@/drizzle";
import { task_assignees } from "@/drizzle/schema";
import { Task_AssigneeI } from "@/interfaces";
import { and, eq } from "drizzle-orm";

export async function assignUser(data: Task_AssigneeI) {
  const newAssignment = await db
    .insert(task_assignees)
    .values(data)
    .returning();

  return newAssignment;
}

export async function unAssignUser(data: Task_AssigneeI) {
  await db
    .delete(task_assignees)
    .where(
      and(
        eq(task_assignees.task_id, data.task_id),
        eq(task_assignees.user_id, data.user_id)
      )
    );
}

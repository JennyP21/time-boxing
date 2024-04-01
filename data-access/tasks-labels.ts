import { db } from "@/drizzle";
import { tasks_labels } from "@/drizzle/schema";
import { Task_LabelI } from "@/interfaces";
import { and, eq } from "drizzle-orm";

export async function assignLabel(data: Task_LabelI) {
  const newAssignment = await db
    .insert(tasks_labels)
    .values(data)
    .returning();

  return newAssignment;
}

export async function unAssignLabel(data: Task_LabelI) {
  await db
    .delete(tasks_labels)
    .where(
      and(
        eq(tasks_labels.task_id, data.task_id),
        eq(tasks_labels.label_id, data.label_id)
      )
    );
}

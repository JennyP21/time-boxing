import { db } from "@/drizzle";
import { tasks_labels } from "@/drizzle/schema";
import { Task_Label } from "@/interfaces";
import { eq } from "drizzle-orm";

export async function assignLabel(data: Task_Label) {
  const newAssignment = await db
    .insert(tasks_labels)
    .values(data)
    .returning();

  return newAssignment;
}

export async function unAssignLabel(id: string) {
  await db
    .delete(tasks_labels)
    .where(eq(tasks_labels.id, id));
}

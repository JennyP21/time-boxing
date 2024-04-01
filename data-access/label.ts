import { db } from "@/drizzle";
import {
  labels,
  tasks,
  tasks_labels,
} from "@/drizzle/schema";
import { LabelI } from "@/interfaces";
import { eq } from "drizzle-orm";

export async function getLabels() {
  const labels = await db.query.labels.findMany();

  return labels;
}

export async function getLabelsByTaskId(task_id: string) {
  const labelsByTask = await db
    .select({
      id: labels.id,
      name: labels.name,
    })
    .from(tasks_labels)
    .fullJoin(labels, eq(tasks_labels.label_id, labels.id))
    .fullJoin(tasks, eq(tasks_labels.task_id, tasks.id))
    .where(eq(tasks.id, task_id));
  return labelsByTask;
}

export async function addLabel(label: LabelI) {
  const newLabel = await db
    .insert(labels)
    .values(label)
    .returning();

  return newLabel;
}

export async function getLabel(id: string) {
  const label = await db
    .select()
    .from(labels)
    .where(eq(labels.id, id));

  return label;
}

export async function deleteLabel(id: string) {
  await db.delete(labels).where(eq(labels.id, id));
}

export async function updateLabel(
  id: string,
  label: LabelI
) {
  const updatedLabel = await db
    .update(labels)
    .set(label)
    .where(eq(labels.id, id))
    .returning();

  return updatedLabel;
}

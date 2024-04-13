import { db } from "@/drizzle";
import {
  labels,
  tasks,
  tasks_labels,
  users,
} from "@/drizzle/schema";
import { TaskI } from "@/interfaces";
import { eq, and } from "drizzle-orm";

export async function getTasksByProjectId(
  project_id: string
) {
  const allTasks = await db
    .select()
    .from(tasks)
    .where(eq(tasks.project_id, project_id));

  return allTasks;
}

export async function getTasksByBucket(bucket_id: string) {
  const tasksByBucket = await db
    .select()
    .from(tasks)
    .where(eq(tasks.bucket_id, bucket_id));
  return tasksByBucket;
}

export async function getTasksByLabelId(
  label_id: string,
  project_id: string
) {
  const tasksByLabel = await db
    .select()
    .from(tasks_labels)
    .fullJoin(labels, eq(tasks_labels.label_id, labels.id))
    .fullJoin(tasks, eq(tasks_labels.task_id, tasks.id))
    .where(
      and(
        eq(tasks.project_id, project_id),
        eq(labels.id, label_id)
      )
    );
  return tasksByLabel;
}

export async function addTask(task: TaskI) {
  const newTask = await db
    .insert(tasks)
    .values(task)
    .returning();

  return newTask;
}

export async function getTask(id: string) {
  const task = await db
    .select()
    .from(tasks)
    .where(eq(tasks.id, id));

  return task;
}

export async function deleteTask(id: string) {
  await db.delete(tasks).where(eq(tasks.id, id));
}

export async function updateTask(id: string, task: TaskI) {
  const updatedTask = await db
    .update(tasks)
    .set(task)
    .where(eq(tasks.id, id))
    .returning();

  return updatedTask;
}

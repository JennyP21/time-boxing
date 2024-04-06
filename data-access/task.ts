import { db } from "@/drizzle";
import {
  labels,
  tasks,
  tasks_labels,
  users,
} from "@/drizzle/schema";
import { TaskI } from "@/interfaces";
import { eq } from "drizzle-orm";

export async function getTasks() {
  const allTasks = await db
    .select()
    .from(tasks)
    .innerJoin(users, eq(tasks.user_id, users.id));

  return allTasks;
}

export async function getTasksByBucket(bucket_id: string) {
  const tasksByBucket = await db
    .select()
    .from(tasks)
    .innerJoin(users, eq(tasks.user_id, users.id))
    .where(eq(tasks.bucket_id, bucket_id));
  return tasksByBucket;
}

export async function getTasksByLabelId(label_id: string) {
  const tasksByLabel = await db
    .select({
      tasks,
      user: users,
    })
    .from(tasks_labels)
    .fullJoin(labels, eq(tasks_labels.label_id, labels.id))
    .fullJoin(tasks, eq(tasks_labels.task_id, tasks.id))
    .innerJoin(users, eq(tasks.user_id, users.id))
    .where(eq(labels.id, label_id));
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

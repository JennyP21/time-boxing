import { db } from "@/drizzle";
import { tasks } from "@/drizzle/schema";
import { TaskI } from "@/interfaces";
import { eq } from "drizzle-orm";

export async function getTasks() {
  const tasks = await db.query.tasks.findMany();

  return tasks;
}

export async function getTasksByBucket(bucket_id: string) {
  const tasksByBucket = await db
    .select()
    .from(tasks)
    .where(eq(tasks.bucket_id, bucket_id));

  return tasksByBucket;
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

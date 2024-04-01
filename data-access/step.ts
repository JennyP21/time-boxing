import { db } from "@/drizzle";
import { steps } from "@/drizzle/schema";
import { StepsI } from "@/interfaces";
import { eq } from "drizzle-orm";

export async function getStepsByTaskId(task_id: string) {
  const result = await db
    .select()
    .from(steps)
    .where(eq(steps.task_id, task_id))
    .orderBy(steps.order);

  return result;
}

export async function addStep(step: StepsI) {
  const newStep = await db
    .insert(steps)
    .values(step)
    .returning();

  return newStep;
}

export async function updateStep(id: string, step: StepsI) {
  const updatedStep = await db
    .update(steps)
    .set(step)
    .where(eq(steps.id, id))
    .returning();

  return updatedStep;
}

export async function deleteStep(id: string) {
  await db.delete(steps).where(eq(steps.id, id));

  return [];
}

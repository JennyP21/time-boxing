import { db } from "@/drizzle";
import { steps } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function getStepsByTaskId(task_id: string) {
  const result = await db
    .select()
    .from(steps)
    .where(eq(steps.task_id, task_id));

  return result;
}

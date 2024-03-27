import { db } from "@/drizzle";
import { labels } from "@/drizzle/schema";
import { LabelI } from "@/interfaces";
import { eq } from "drizzle-orm";

export async function getLabels() {
  const labels = await db.query.labels.findMany();

  return labels;
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

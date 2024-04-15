import { db } from "@/drizzle";
import { buckets } from "@/drizzle/schema";
import { BucketI } from "@/interfaces";
import { eq } from "drizzle-orm";

export async function getBucketsByProjectId(
  project_id: string
) {
  const bucketsByProjectId = await db
    .select()
    .from(buckets)
    .orderBy(buckets.order)
    .where(eq(buckets.project_id, project_id));

  return bucketsByProjectId;
}

export async function addBucket(bucket: BucketI) {
  const newBucket = await db
    .insert(buckets)
    .values(bucket)
    .returning();

  return newBucket;
}

export async function getBucket(id: string) {
  const bucket = await db
    .select()
    .from(buckets)
    .where(eq(buckets.id, id));

  return bucket;
}

export async function deleteBucket(id: string) {
  await db.delete(buckets).where(eq(buckets.id, id));
}

export async function updateBucket(
  id: string,
  bucket: BucketI
) {
  const updatedBucket = await db
    .update(buckets)
    .set(bucket)
    .where(eq(buckets.id, id))
    .returning();

  return updatedBucket;
}

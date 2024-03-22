import { db } from "@/drizzle";
import { buckets } from "@/drizzle/schema";
import { Bucket } from "@/interfaces";
import { eq } from "drizzle-orm";

export async function getBuckets() {
  const buckets = await db.query.buckets.findMany();

  return buckets;
}

export async function addBucket(bucket: Bucket) {
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
  bucket: Bucket
) {
  const updatedBucket = await db
    .update(buckets)
    .set(bucket)
    .where(eq(buckets.id, id))
    .returning();

  return updatedBucket;
}

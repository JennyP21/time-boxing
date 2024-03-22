import { db } from "@/drizzle";
import { buckets } from "@/drizzle/schema";
import { Bucket } from "@/interfaces";

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

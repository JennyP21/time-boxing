import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@/drizzle/schema";

const connectionString = process.env.DB_URL;

declare global {
  var dbPool: Pool | undefined;
}

const client = globalThis.dbPool || new Pool({ connectionString });
if (process.env.NODE_ENV !== "production") {
  globalThis.dbPool = client;
}

export const db = drizzle(client, { schema });

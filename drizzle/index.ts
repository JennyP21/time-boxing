import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@/drizzle/schema";

const connectionString = process.env.DB_URL;

const client = new Pool({ connectionString });

await client.connect();
export const db = drizzle(client, { schema });

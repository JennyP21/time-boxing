import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import "dotenv/config";

const connectionString = process.env.DB_URL;

const pool = new Pool({
  connectionString,
});

const db = drizzle(pool);

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: "drizzle/migrations",
    });
    console.log("Migration successfully");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

main();

import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from ".";

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

import {
  date,
  pgTable,
  text,
  uuid,
} from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks", {
  id: uuid("id").primaryKey(),
  title: text("title").notNull(),
  start_date: date("start_date").notNull(),
  end_date: date("end_date").notNull(),
  severity: text("severity", {
    enum: ["low", "medium", "high", "urgent"],
  }).default("medium"),
  steps: text("steps").array(20),
  label: text("label").array(20),
});

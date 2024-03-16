import {
  date,
  pgTable,
  serial,
  text,
  timestamp,
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
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }),
});

export const labels = pgTable("labels", {
  id: uuid("id").primaryKey(),
  name: text("title").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }),
});

export const tasks_labels = pgTable("tasks_labels", {
  id: serial("id").primaryKey(),
  task_id: uuid("task_id").references(() => tasks.id),
  label_id: uuid("label_id").references(() => labels.id),
});

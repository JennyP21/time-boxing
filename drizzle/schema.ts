import {
  date,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  primaryKey,
  integer,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";

export const tasks = pgTable("tasks", {
  id: uuid("id").primaryKey(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id),
  title: text("title").notNull(),
  start_date: date("start_date").notNull(),
  end_date: date("end_date").notNull(),
  severity: text("severity", {
    enum: ["low", "medium", "high", "urgent"],
  }).default("medium"),
  progress: text("progress", {
    enum: [
      "Not Started",
      "In Progress",
      "On Hold",
      "Completed",
    ],
  }).default("Not Started"),
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

export const bucket = pgTable("bucket", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  task_id: uuid("task_id").references(() => tasks.id),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at", { mode: "date" }),
});

export const tasks_labels = pgTable("tasks_labels", {
  id: serial("id").primaryKey(),
  task_id: uuid("task_id").references(() => tasks.id),
  label_id: uuid("label_id").references(() => labels.id),
});

// OAuth User
export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
  }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type")
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [
        account.provider,
        account.providerAccountId,
      ],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", {
      mode: "date",
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({
      columns: [vt.identifier, vt.token],
    }),
  })
);

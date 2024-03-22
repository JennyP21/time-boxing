import type { AdapterAccount } from "@auth/core/adapters";
import { relations } from "drizzle-orm";
import {
  date,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const buckets = pgTable("bucket", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id),
  created_at: timestamp("created_at"),
  updated_at: timestamp("updated_at"),
});

export const bucketsRelations = relations(
  buckets,
  ({ many, one }) => ({
    tasks: many(tasks),
    users: one(users),
  })
);

export const tasks = pgTable("tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id),
  bucket_id: uuid("bucket_id").references(() => buckets.id),
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
  created_at: timestamp("created_at"),
  updated_at: timestamp("updated_at"),
});

export const tasksRelations = relations(
  tasks,
  ({ many, one }) => ({
    tasks_labels: many(tasks_labels),
    bucket: one(buckets, {
      fields: [tasks.bucket_id],
      references: [buckets.id],
    }),
    users: one(users, {
      fields: [tasks.user_id],
      references: [users.id],
    }),
  })
);

export const labels = pgTable("labels", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("title").notNull(),
  created_at: timestamp("created_at"),
  updated_at: timestamp("updated_at"),
});

export const labelsRelations = relations(
  labels,
  ({ many }) => ({
    tasks_labels: many(tasks_labels),
  })
);

export const tasks_labels = pgTable("tasks_labels", {
  id: serial("id").primaryKey(),
  task_id: uuid("task_id").references(() => tasks.id),
  label_id: uuid("label_id").references(() => labels.id),
});

export const labelsToTasks = relations(
  tasks_labels,
  ({ one }) => ({
    task: one(tasks, {
      fields: [tasks_labels.task_id],
      references: [tasks.id],
    }),
    label: one(labels, {
      fields: [tasks_labels.label_id],
      references: [labels.id],
    }),
  })
);

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

export const usersRelation = relations(
  users,
  ({ many }) => ({
    tasks: many(tasks),
    buckets: many(buckets),
    sessions: many(sessions),
    accounts: many(accounts),
  })
);

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

export const accountsRelation = relations(
  accounts,
  ({ one }) => ({
    user: one(users, {
      fields: [accounts.userId],
      references: [users.id],
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

export const sessionsRelation = relations(
  sessions,
  ({ one }) => ({
    user: one(users, {
      fields: [sessions.userId],
      references: [users.id],
    }),
  })
);

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

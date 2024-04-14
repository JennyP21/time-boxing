import type { AdapterAccount } from "@auth/core/adapters";
import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const teams = pgTable("teams", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  desc: varchar("desc", { length: 2000 }),
  created_at: timestamp("created_at"),
  updated_at: timestamp("updated_at"),
});

export const teamsRelations = relations(
  teams,
  ({ many }) => ({
    team_members: many(team_members),
  })
);

export const team_members = pgTable("team_members", {
  id: uuid("id").primaryKey().defaultRandom(),
  team_id: uuid("team_id")
    .notNull()
    .references(() => teams.id),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id),
  role: text("role", { enum: ["owner", "member"] }),
  created_at: timestamp("created_at"),
});

export const teamMembersRelations = relations(
  team_members,
  ({ one }) => ({
    teams: one(teams, {
      fields: [team_members.team_id],
      references: [teams.id],
    }),
    users: one(users, {
      fields: [team_members.user_id],
      references: [users.id],
    }),
  })
);

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id),
  created_at: timestamp("created_at"),
  updated_at: timestamp("updated_at"),
});

export const projectsRelations = relations(
  projects,
  ({ one, many }) => ({
    user: one(users, {
      fields: [projects.user_id],
      references: [users.id],
    }),
    tasks: many(tasks),
  })
);

export const buckets = pgTable("buckets", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  order: integer("order").notNull(),
  project_id: uuid("project_id")
    .notNull()
    .references(() => projects.id),
  created_at: timestamp("created_at"),
  updated_at: timestamp("updated_at"),
});

export const bucketsRelations = relations(
  buckets,
  ({ many, one }) => ({
    tasks: many(tasks),
    projects: one(projects, {
      fields: [buckets.project_id],
      references: [projects.id],
    }),
  })
);

export const tasks = pgTable("tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  project_id: uuid("project_id").references(
    () => projects.id
  ),
  bucket_id: uuid("bucket_id").references(() => buckets.id),
  title: text("title").notNull(),
  start_date: date("start_date"),
  end_date: date("end_date"),
  severity: text("severity", {
    enum: ["Low", "Medium", "High", "Urgent"],
  }).default("Medium"),
  progress: text("progress", {
    enum: [
      "Not Started",
      "In Progress",
      "On Hold",
      "Completed",
    ],
  }).default("Not Started"),
  note: varchar("note", { length: 1500 }),
  showOnTask: text("showOnTask", {
    enum: ["note", "steps"],
  }),
  created_at: timestamp("created_at"),
  updated_at: timestamp("updated_at"),
});

export const tasksRelations = relations(
  tasks,
  ({ many, one }) => ({
    tasks_labels: many(tasks_labels),
    steps: many(steps),
    bucket: one(buckets, {
      fields: [tasks.bucket_id],
      references: [buckets.id],
    }),
    project: one(projects, {
      fields: [tasks.project_id],
      references: [projects.id],
    }),
  })
);

export const steps = pgTable("steps", {
  id: uuid("id").primaryKey().defaultRandom(),
  task_id: uuid("task_id").references(() => tasks.id, {
    onDelete: "cascade",
  }),
  value: text("value").notNull(),
  order: integer("order").notNull(),
  checked: boolean("checked").default(false),
});

export const stepsRelations = relations(
  steps,
  ({ one }) => ({
    task: one(tasks, {
      fields: [steps.task_id],
      references: [tasks.id],
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
  id: uuid("id").primaryKey().defaultRandom(),
  task_id: uuid("task_id").references(() => tasks.id, {
    onDelete: "cascade",
  }),
  label_id: uuid("label_id").references(() => labels.id, {
    onDelete: "cascade",
  }),
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
    sessions: many(sessions),
    accounts: many(accounts),
    projects: many(projects),
    team_members: many(team_members),
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

ALTER TABLE "tasks" DROP CONSTRAINT "tasks_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "tasks" DROP COLUMN IF EXISTS "user_id";
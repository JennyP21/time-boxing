ALTER TABLE "bucket" DROP CONSTRAINT "bucket_task_id_tasks_id_fk";
--> statement-breakpoint
ALTER TABLE "bucket" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "bucket_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bucket" ADD CONSTRAINT "bucket_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks" ADD CONSTRAINT "tasks_bucket_id_bucket_id_fk" FOREIGN KEY ("bucket_id") REFERENCES "bucket"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "bucket" DROP COLUMN IF EXISTS "task_id";
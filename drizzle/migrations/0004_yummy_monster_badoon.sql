CREATE TABLE IF NOT EXISTS "bucket" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"task_id" uuid,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "progress" text DEFAULT 'Not Started';--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bucket" ADD CONSTRAINT "bucket_task_id_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

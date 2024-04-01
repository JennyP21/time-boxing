ALTER TABLE "steps" DROP CONSTRAINT "steps_task_id_tasks_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "steps" ADD CONSTRAINT "steps_task_id_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

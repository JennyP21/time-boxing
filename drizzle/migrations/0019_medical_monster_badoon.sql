ALTER TABLE "tasks_labels" DROP CONSTRAINT "tasks_labels_task_id_tasks_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks_labels" ADD CONSTRAINT "tasks_labels_task_id_tasks_id_fk" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

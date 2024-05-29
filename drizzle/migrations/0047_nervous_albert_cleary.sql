ALTER TABLE "tasks_labels" DROP CONSTRAINT "tasks_labels_label_id_labels_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks_labels" ADD CONSTRAINT "tasks_labels_label_id_labels_id_fk" FOREIGN KEY ("label_id") REFERENCES "public"."labels"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

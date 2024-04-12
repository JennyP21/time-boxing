ALTER TABLE "buckets" DROP CONSTRAINT "buckets_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "buckets" ADD COLUMN "project_id" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "buckets" ADD CONSTRAINT "buckets_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "buckets" DROP COLUMN IF EXISTS "user_id";
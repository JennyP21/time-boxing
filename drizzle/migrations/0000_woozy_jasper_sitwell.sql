CREATE TABLE IF NOT EXISTS "tasks" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"severity" text DEFAULT 'medium',
	"steps" text[20],
	"label" text[20]
);

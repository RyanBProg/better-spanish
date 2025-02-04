CREATE TABLE "verb_tenses" (
	"id" serial PRIMARY KEY NOT NULL,
	"verb_id" integer NOT NULL,
	"tense" text NOT NULL,
	"type" text NOT NULL,
	"prefix" text NOT NULL,
	"spanish" text NOT NULL,
	"english" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verbs" (
	"id" serial PRIMARY KEY NOT NULL,
	"spanish" text NOT NULL,
	"english" text NOT NULL,
	"gerund_spanish" text NOT NULL,
	"gerund_english" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "verb_tenses" ADD CONSTRAINT "verb_tenses_verb_id_verbs_id_fk" FOREIGN KEY ("verb_id") REFERENCES "public"."verbs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "verb_tense_idx" ON "verb_tenses" USING btree ("verb_id","tense");--> statement-breakpoint
CREATE UNIQUE INDEX "verb_tense_unique" ON "verb_tenses" USING btree ("verb_id","tense","type");--> statement-breakpoint
CREATE UNIQUE INDEX "verb_spanish_unique" ON "verbs" USING btree ("spanish");
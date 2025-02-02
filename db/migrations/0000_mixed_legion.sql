CREATE TABLE "user_flashcards" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"word_id" integer NOT NULL,
	"ease_factor" real DEFAULT 2.5,
	"interval" smallint DEFAULT 1,
	"streak" smallint DEFAULT 0,
	"last_reviewed" timestamp DEFAULT now(),
	"next_review" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"kinde_id" text NOT NULL,
	"family_name" text NOT NULL,
	"given_name" text NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_kinde_id_unique" UNIQUE("kinde_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "words" (
	"id" serial PRIMARY KEY NOT NULL,
	"spanish" text NOT NULL,
	"english" text NOT NULL,
	"category" text
);
--> statement-breakpoint
ALTER TABLE "user_flashcards" ADD CONSTRAINT "user_flashcards_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_flashcards" ADD CONSTRAINT "user_flashcards_word_id_words_id_fk" FOREIGN KEY ("word_id") REFERENCES "public"."words"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "user_word_unique" ON "user_flashcards" USING btree ("user_id","word_id");--> statement-breakpoint
CREATE INDEX "next_review" ON "user_flashcards" USING btree ("next_review");--> statement-breakpoint
CREATE INDEX "word_category" ON "words" USING btree ("category");
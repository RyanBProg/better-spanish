import {
  pgTable,
  serial,
  text,
  integer,
  real,
  timestamp,
  smallint,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// Stores user information
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  kindeId: text("kinde_id").unique().notNull(),
  family_name: text("family_name").notNull(),
  given_name: text("given_name").notNull(),
  email: text("email").unique().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// A global table containing all words, translations, and metadata
export const words = pgTable(
  "words",
  {
    id: serial("id").primaryKey(),
    spanish: text("spanish").notNull(),
    english: text("english").notNull(),
    category: text("category").notNull(),
  },
  (table) => [index("word_category").on(table.category)]
);

// Tracks each user's progress per word
export const userFlashcards = pgTable(
  "user_flashcards",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    wordId: integer("word_id")
      .notNull()
      .references(() => words.id, { onDelete: "cascade" }),
    easeFactor: real("ease_factor").default(2.5), // Determines interval adjustments
    interval: smallint("interval").default(1), // Days until next review
    streak: smallint("streak").default(0),
    lastReviewed: timestamp("last_reviewed").defaultNow(),
    nextReview: timestamp("next_review").notNull(),
  },
  (table) => [
    uniqueIndex("user_word_unique").on(table.userId, table.wordId), // Ensures each user has only one record per word
    index("next_review").on(table.nextReview),
  ]
);

// Base verbs table
export const verbs = pgTable(
  "verbs",
  {
    id: serial("id").primaryKey(),
    spanish: text("spanish").notNull(),
    english: text("english").notNull(),
    gerundSpanish: text("gerund_spanish").notNull(),
    gerundEnglish: text("gerund_english").notNull(),
  },
  (table) => [uniqueIndex("verb_spanish_unique").on(table.spanish)]
);

// Verb tenses
export const verbTenses = pgTable(
  "verb_tenses",
  {
    id: serial("id").primaryKey(),
    verbId: integer("verb_id")
      .notNull()
      .references(() => verbs.id, { onDelete: "cascade" }),
    tense: text("tense").notNull(), // 'present', 'past', 'future'
    type: text("type").notNull(), // 'first-person singular', etc.
    prefix: text("prefix").notNull(), // 'yo', 'tú', etc.
    spanish: text("spanish").notNull(),
    english: text("english").notNull(),
  },
  (table) => [
    index("verb_tense_idx").on(table.verbId, table.tense),
    uniqueIndex("verb_tense_unique").on(table.verbId, table.tense, table.type),
  ]
);

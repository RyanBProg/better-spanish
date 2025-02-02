"use server";

import { db } from "@/db/drizzle";
import { userFlashcards } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { UserFlashcard } from "@/lib/types";

export const upsertUserFlashcard = async (
  wordId: number,
  userId: number,
  rating: number
) => {
  // check for userFlashcard that matches the wordId and userId
  const existingUserFlashcard = await db
    .select()
    .from(userFlashcards)
    .where(
      and(eq(userFlashcards.userId, userId), eq(userFlashcards.wordId, wordId))
    )
    .then((results) => results[0] as UserFlashcard | undefined);

  // Get existing values or use defaults
  let easeFactor = existingUserFlashcard?.easeFactor ?? 2.5;
  let interval = existingUserFlashcard?.interval ?? 1;
  let streak = existingUserFlashcard?.streak ?? 0;
  const now = new Date();
  let nextReview = new Date();

  // Apply spaced repetition logic based on 4-point rating
  if (rating < 3) {
    // Hard (2) or Again (1)
    easeFactor = Math.max(1.3, easeFactor - 0.15);
    streak = 0;
    interval = rating === 1 ? 1 : Math.max(1, Math.round(interval * 0.5));
    nextReview.setDate(now.getDate() + interval);
  } else {
    // Good (3) or Easy (4)
    easeFactor = rating === 4 ? Math.min(2.5, easeFactor + 0.15) : easeFactor;

    streak += 1;

    if (streak === 1) interval = 1;
    else if (streak === 2) interval = 3;
    else interval = Math.round(interval * easeFactor);

    if (rating === 4) interval = Math.round(interval * 1.3); // Bonus interval for "Easy"
    nextReview.setDate(now.getDate() + interval);
  }

  // Ensure interval stays reasonable
  interval = Math.min(interval, 365); // Cap at 1 year

  await db
    .insert(userFlashcards)
    .values({
      userId,
      wordId,
      easeFactor,
      interval,
      streak,
      lastReviewed: now,
      nextReview: nextReview,
    })
    .onConflictDoUpdate({
      target: [userFlashcards.userId, userFlashcards.wordId],
      set: {
        easeFactor,
        interval,
        streak,
        lastReviewed: now,
        nextReview: nextReview,
      },
    });
};

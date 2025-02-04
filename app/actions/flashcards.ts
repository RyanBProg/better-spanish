"use server";

import { db } from "@/db/drizzle";
import { userFlashcards } from "@/db/schema";
import { eq, and, inArray, sql } from "drizzle-orm";
import { UserFlashcardAnswer } from "@/lib/types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const getMatchingUserFlashcards = async (
  answers: UserFlashcardAnswer[],
  userId: number
) => {
  return await db
    .select()
    .from(userFlashcards)
    .where(
      and(
        eq(userFlashcards.userId, userId),
        inArray(
          userFlashcards.wordId,
          answers.map((a) => a.wordId)
        )
      )
    );
};

const getUserUpdates = async (
  answers: UserFlashcardAnswer[],
  userId: number
) => {
  const matchingUserFlashcards = await getMatchingUserFlashcards(
    answers,
    userId
  );

  return answers.map((answer) => {
    // is there an existing entry in the userFlashcard table?
    const match = matchingUserFlashcards.find(
      (index) => index.wordId === answer.wordId
    );

    let easeFactor = match?.easeFactor ?? 2.5;
    let interval = match?.interval ?? 1;
    let streak = match?.streak ?? 0;
    const now = new Date();
    let nextReview = new Date();

    // Apply spaced repetition logic based on 4-point rating
    if (answer.rating < 3) {
      // Hard (2) or Again (1)
      easeFactor = Math.max(1.3, easeFactor - 0.15);
      streak = 0;
      interval =
        answer.rating === 1 ? 1 : Math.max(1, Math.round(interval * 0.5));
      nextReview.setDate(now.getDate() + interval);
    } else {
      // Good (3) or Easy (4)
      easeFactor =
        answer.rating === 4 ? Math.min(2.5, easeFactor + 0.15) : easeFactor;

      streak += 1;

      if (streak === 1) interval = 1;
      else if (streak === 2) interval = 3;
      else interval = Math.round(interval * easeFactor);

      if (answer.rating === 4) interval = Math.round(interval * 1.3); // Bonus interval for "Easy"
      nextReview.setDate(now.getDate() + interval);
    }

    // Ensure interval stays reasonable
    interval = Math.min(interval, 365); // Cap at 1 year

    return {
      userId,
      wordId: answer.wordId,
      easeFactor,
      interval,
      streak,
      lastReviewed: now,
      nextReview: nextReview,
    };
  });
};

export const batchUpsertUserFlashcards = async (
  answers: UserFlashcardAnswer[],
  userId: number
) => {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  !isUserAuthenticated && redirect("/api/auth/login");

  const userUpdates = await getUserUpdates(answers, userId);

  // Single batch upsert
  await db
    .insert(userFlashcards)
    .values(userUpdates)
    .onConflictDoUpdate({
      target: [userFlashcards.userId, userFlashcards.wordId],
      set: {
        easeFactor: sql`EXCLUDED.ease_factor`,
        interval: sql`EXCLUDED.interval`,
        streak: sql`EXCLUDED.streak`,
        lastReviewed: sql`EXCLUDED.last_reviewed`,
        nextReview: sql`EXCLUDED.next_review`,
      },
    });
};

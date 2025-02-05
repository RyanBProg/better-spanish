"use server";

import { db } from "@/db/drizzle";
import { userFlashcards, words } from "@/db/schema";
import { eq, and, inArray, sql, lt, notInArray } from "drizzle-orm";
import { UserFlashcardAnswer, Word } from "@/lib/types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

type ActionResponse<T = void> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

const getMatchingUserFlashcards = async (
  answers: UserFlashcardAnswer[],
  userId: number
) => {
  try {
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
  } catch (error) {
    return { success: false, error: "Database operation failed" };
  }
};

const getUserUpdates = async (
  answers: UserFlashcardAnswer[],
  userId: number
) => {
  if (!answers || !userId) {
    return { success: false, error: "Invalid input parameters" };
  }

  try {
    const matchingUserFlashcards = await getMatchingUserFlashcards(
      answers,
      userId
    );

    if (!matchingUserFlashcards || !Array.isArray(matchingUserFlashcards)) {
      if (matchingUserFlashcards.error) {
        return matchingUserFlashcards;
      } else {
        return { success: false, error: "An unexpected error occurred" };
      }
    }

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
  } catch (error) {
    return { success: false, error: "Database operation failed" };
  }
};

export const batchUpsertUserFlashcards = async (
  answers: UserFlashcardAnswer[],
  userId: number
): Promise<ActionResponse> => {
  try {
    const { isAuthenticated } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();
    !isUserAuthenticated && redirect("/api/auth/login");

    if (!answers || !userId) {
      return { success: false, error: "Invalid input parameters" };
    }

    const userUpdates = await getUserUpdates(answers, userId);

    if (!userUpdates || !Array.isArray(userUpdates)) {
      if (userUpdates.error) {
        return userUpdates;
      } else {
        return { success: false, error: "An unexpected error occurred" };
      }
    }

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
    return { success: true, message: "User data updated successfully" };
  } catch (error) {
    return { success: false, error: "An unexpected error occurred" };
  }
};

export const getFlashcards = async (
  userId: number
): Promise<ActionResponse<Word[]>> => {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  !isUserAuthenticated && redirect("/api/auth/login");

  if (!userId) {
    return { success: false, error: "Invalid input parameters" };
  }

  try {
    // Get all due flashcards
    const dueFlashcards = await db
      .select({
        wordId: userFlashcards.wordId,
      })
      .from(userFlashcards)
      .where(
        and(
          eq(userFlashcards.userId, userId),
          lt(userFlashcards.nextReview, new Date())
        )
      )
      .limit(20); // limit to 20 results

    if (!dueFlashcards) {
      return { success: false, error: "Database operation failed" };
    }

    // there is 20 or more flashcards due for review, get those ones
    if (dueFlashcards.length >= 20) {
      const dueWords = await db
        .select()
        .from(words)
        .where(
          inArray(
            words.id,
            dueFlashcards.map((f) => f.wordId)
          )
        );

      if (!dueWords) {
        return { success: false, error: "Database operation failed" };
      }
      return { success: true, data: dueWords };
    }

    // no due flashacards, grab 20 new ones
    if (dueFlashcards.length === 0) {
      const newWords = await db
        .select()
        .from(words)
        .orderBy(sql`RANDOM()`)
        .limit(20);

      if (!newWords) {
        return { success: false, error: "Database operation failed" };
      }

      return { success: true, data: newWords };
    }

    // there is due flashcards but less than 20, grab new words to get the deck to 20
    const dueWords = await db
      .select()
      .from(words)
      .where(
        inArray(
          words.id,
          dueFlashcards.map((f) => f.wordId)
        )
      );

    // Calculate how many more words we need
    const extraQty = 20 - dueWords.length;

    const extraWords = await db
      .select()
      .from(words)
      .where(
        notInArray(
          words.id,
          dueWords.map((word) => word.id)
        )
      )
      .orderBy(sql`RANDOM()`)
      .limit(extraQty);

    if (!extraWords || !dueWords) {
      return { success: false, error: "Database operation failed" };
    }

    return { success: true, data: [...dueWords, ...extraWords] };
  } catch (error) {
    return { success: false, error: "An unexpected error occurred" };
  }
};

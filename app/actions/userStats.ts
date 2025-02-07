"use server";

import { db } from "@/db/drizzle";
import { userFlashcards } from "@/db/schema";
import { eq, and, lt, avg } from "drizzle-orm";

type ActionResponse = {
  success?: boolean;
  dueFlashcards?: number;
  wordsReviewed?: number;
  averageWordStreak?: number;
  error?: string;
};

export const getUserStats = async (userId: number): Promise<ActionResponse> => {
  try {
    // Get all due flashcards
    const dueFlashcards = await db
      .select()
      .from(userFlashcards)
      .where(
        and(
          eq(userFlashcards.userId, userId),
          lt(userFlashcards.nextReview, new Date())
        )
      );

    const [{ average }] = await db
      .select({
        average: avg(userFlashcards.streak),
      })
      .from(userFlashcards)
      .where(eq(userFlashcards.userId, userId));

    const wordsReviewed = await db
      .select()
      .from(userFlashcards)
      .where(and(eq(userFlashcards.userId, userId)));

    return {
      dueFlashcards: dueFlashcards ? dueFlashcards.length : 0,
      wordsReviewed: wordsReviewed ? wordsReviewed.length : 0,
      averageWordStreak: average ? parseFloat(average) : 0,
    };
  } catch (error) {
    return { success: false, error: "Database operation failed" };
  }
};

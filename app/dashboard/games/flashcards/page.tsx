"use server";

import { db } from "@/db/drizzle";
import { userFlashcards, words } from "@/db/schema";
import { eq, and, lt, sql, notInArray, inArray } from "drizzle-orm";
import FlashcardGame from "@/components/flashcards/FlashcardGame";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { getOrCreateUser } from "@/lib/getOrCreateUser";

const getFlashcards = async (userId: number) => {
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

  // Get the words for due flashcards
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

  if (extraQty > 0) {
    // Get additional new words
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

    return [...dueWords, ...extraWords];
  }

  return dueWords;
};

export default async function page() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  !isUserAuthenticated && redirect("/api/auth/login");
  const kindeUser = await getUser();

  // use kinde user id to lookup user in db
  const dbUser = await getOrCreateUser(kindeUser);

  const flashcardDeck = await getFlashcards(dbUser.id);

  return (
    <div className="my-10 sm:my-20">
      <h1 className="text-center mb-10 font-bold text-4xl">Flashcards</h1>

      <FlashcardGame flashcardDeck={flashcardDeck} userId={dbUser.id} />
    </div>
  );
}

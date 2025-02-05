"use server";

import FlashcardGame from "@/components/flashcards/FlashcardGame";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getOrCreateUser } from "@/lib/getOrCreateUser";
import { getFlashcards } from "@/app/actions/flashcards";
import GameHeading from "@/components/common/GameHeading";

export default async function page() {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();

  // use kinde user id to lookup user in db or create one if it doesn't exist
  const dbUser = await getOrCreateUser(kindeUser);

  const flashcardDeck = await getFlashcards(dbUser.id);

  if (!flashcardDeck.data) {
    console.error(flashcardDeck.error || "An unexpected error occurred");
    return (
      <FlashcardGame
        error={flashcardDeck.error || "An unexpected error occurred"}
      />
    );
  }

  return (
    <div className="width-container my-10 sm:my-20">
      <div className="width-inner">
        <GameHeading
          title="Flashcards"
          tip="Rate how well you know each word. Words you find difficult will appear more frequently, helping you learn faster through spaced repetition"
        />

        {/* spacer */}
        <div className="h-28"></div>

        <FlashcardGame flashcardDeck={flashcardDeck.data} userId={dbUser.id} />
      </div>
    </div>
  );
}

"use server";

import FlashcardGame from "@/components/flashcards/FlashcardGame";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getOrCreateUser } from "@/lib/getOrCreateUser";
import { getFlashcards } from "@/app/actions/flashcards";

export default async function page() {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();

  // use kinde user id to lookup user in db or create one if it doesn't exist
  const dbUser = await getOrCreateUser(kindeUser);

  const flashcardDeck = await getFlashcards(dbUser.id);

  return (
    <div className="my-10 sm:my-20">
      <h1 className="text-center mb-20 font-bold text-4xl">Flashcards</h1>

      <FlashcardGame flashcardDeck={flashcardDeck} userId={dbUser.id} />
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { UserFlashcardAnswer, Word } from "@/lib/types";
import { useRouter } from "next/navigation";
import { batchUpsertUserFlashcards } from "@/app/actions/flashcards";
import FlashcardControls from "./FlashcardControls";
import Flashcard from "./Flashcard";
import GameReviewDialog from "./GameReviewDialog";

type Props = {
  flashcardDeck: Word[];
  userId: number;
};

export default function FlashcardGame({ flashcardDeck, userId }: Props) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [deckIndex, setDeckIndex] = useState(0);
  const [deckCompleted, setDeckCompleted] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [answers, setAnswers] = useState<UserFlashcardAnswer[]>([]);
  const router = useRouter();

  const handleAnswer = async (rating: number) => {
    if (isUpdating) return; // Prevent double clicks

    // Prevent answering when game is complete
    if (deckCompleted) {
      setDialogOpen(true);
      return;
    }

    setIsUpdating(true);

    // Create new answer
    const newAnswer = {
      wordId: flashcardDeck[deckIndex].id,
      word: flashcardDeck[deckIndex].spanish,
      translation: flashcardDeck[deckIndex].english,
      rating,
    };

    // Update answers state
    setAnswers((prev) => [...prev, newAnswer]);

    if (deckIndex + 1 === 20) {
      setDeckCompleted(true);
      setDialogOpen(true);

      try {
        await batchUpsertUserFlashcards([...answers, newAnswer], userId);
      } catch (error) {
        console.log(error);
      }
    } else {
      setDeckIndex((prev) => prev + 1);
    }

    setIsFlipped(false);
    setIsUpdating(false);
  };

  const handleNewDeck = () => {
    router.refresh();
    setDeckIndex(0);
    setIsFlipped(false);
    setDeckCompleted(false);
    setDialogOpen(false);
    setAnswers([]);
  };

  return (
    <>
      <Flashcard
        isUpdating={isUpdating}
        isFlipped={isFlipped}
        setIsFlipped={setIsFlipped}
        deckIndex={deckIndex}
        flashcardDeck={flashcardDeck}
      />

      <FlashcardControls
        isUpdating={isUpdating}
        deckCompleted={deckCompleted}
        handleAnswer={handleAnswer}
      />

      {deckCompleted && (
        <div className="mx-auto w-fit">
          <Button onClick={() => setDialogOpen(true)}>See Game Review</Button>
        </div>
      )}

      <GameReviewDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        answers={answers}
        handleNewDeck={handleNewDeck}
      />
    </>
  );
}

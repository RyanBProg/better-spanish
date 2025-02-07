"use client";

import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { UserFlashcardAnswer, Word } from "@/lib/types";
import { useRouter } from "next/navigation";
import { batchUpsertUserFlashcards } from "@/app/actions/flashcards";
import FlashcardControls from "./FlashcardControls";
import Flashcard from "./Flashcard";
import GameReviewDialog from "./GameReviewDialog";
import LoadingSpinner from "../common/LoadingSpinner";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "../ui/toaster";

type Props = {
  error?: string;
  flashcardDeck?: Word[];
  userId?: number;
};

export default function FlashcardGame({ error, flashcardDeck, userId }: Props) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [deckIndex, setDeckIndex] = useState(0);
  const [deckCompleted, setDeckCompleted] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [answers, setAnswers] = useState<UserFlashcardAnswer[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  if (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: error,
    });
    return null;
  }

  if (!flashcardDeck || !userId) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "An unexpected error occurred",
    });
    return null;
  }

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
        toast({
          variant: "destructive",
          title: "Error saving progress",
        });
      }
    } else {
      setDeckIndex((prev) => prev + 1);
    }

    setIsFlipped(false);
    setIsUpdating(false);
  };

  const handleNewDeck = () => {
    startTransition(() => {
      router.refresh();
      setDeckIndex(0);
      setIsFlipped(false);
      setDeckCompleted(false);
      setDialogOpen(false);
      setAnswers([]);
    });
  };

  if (isPending) {
    return (
      <div className="mx-auto h-[450px] w-[350px] p-4 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto w-fit my-10">
        <span className="relative text-2xl">
          {deckIndex + 1}
          <span className="absolute -bottom-1 right-0 translate-x-full text-sm font-light">
            /{flashcardDeck.length}
          </span>
        </span>
      </div>
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
      <Toaster />
    </>
  );
}

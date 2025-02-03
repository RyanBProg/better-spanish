"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Word } from "@/lib/types";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import LoadingSpinner from "../common/LoadingSpinner";
import Image from "next/image";

type Answer = {
  word: string;
  translation: string;
  rating: number;
};

type Props = {
  flashcardDeck: Word[];
  upsertUserFlashcard: (
    wordId: number,
    userId: number,
    rating: number
  ) => Promise<void>;
  userId: number;
};

export default function Flashcard({
  flashcardDeck,
  upsertUserFlashcard,
  userId,
}: Props) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [deckIndex, setDeckIndex] = useState(0);
  const [deckCompleted, setDeckCompleted] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const router = useRouter();

  const handleAnswer = async (rating: number) => {
    if (isUpdating) return; // Prevent double clicks

    // Prevent answering when game is complete
    if (deckCompleted) {
      setDialogOpen(true);
      return;
    }

    setIsUpdating(true);

    if (deckIndex + 1 === 20) {
      setDeckCompleted(true);
      setDialogOpen(true);
    } else {
      setDeckIndex((prev) => prev + 1);
      setIsFlipped(false);
    }

    // Update user answers
    setAnswers((prev) => [
      ...prev,
      {
        word: flashcardDeck[deckIndex].spanish,
        translation: flashcardDeck[deckIndex].english,
        rating,
      },
    ]);

    try {
      // Update database in background
      await upsertUserFlashcard(flashcardDeck[deckIndex].id, userId, rating);
    } catch (error) {
      console.error("Failed to update flashcard:", error);

      setAnswers((prev) => prev.slice(0, -1)); // Remove last answer on error

      // Revert optimistic update on error
      setDeckIndex(deckIndex);
      setIsFlipped(false);
    }

    setIsUpdating(false);
  };

  const handleNewDeck = () => {
    router.refresh();
    setDeckIndex(0);
    setIsFlipped(false);
    setDeckCompleted(false);
  };

  const getRatingColor = (rating: number) => {
    switch (rating) {
      case 4:
        return "text-green-500";
      case 3:
        return "text-yellow-500";
      case 2:
        return "text-orange-500";
      case 1:
        return "text-red-500";
      default:
        return "";
    }
  };

  return (
    <>
      <div className="mx-auto h-[230px] w-[300px] sm:h-[300px] sm:w-[400px] z-10 perspective-[1000px]">
        <div
          className={`relative w-full h-full container__flashcard ${
            isFlipped ? "container__flashcard--flipped" : ""
          }`}>
          {/* Front card */}
          <div className="flashcard border-8 border-orange-500">
            {isUpdating ? (
              <LoadingSpinner size="sm" />
            ) : (
              <span className="text-2xl capitalize border-b">
                {flashcardDeck[deckIndex].spanish}
              </span>
            )}
            <Button
              className="absolute mx-auto bottom-3"
              variant="outline"
              disabled={isUpdating}
              tabIndex={!isFlipped ? 0 : -1}
              onClick={() => setIsFlipped((prev) => !prev)}>
              Flip
            </Button>
            <div className="absolute top-0 right-2">
              <Image
                src="/icons/spain-flag-96x96.png"
                height={38}
                width={38}
                alt="spain flag"
              />
            </div>
          </div>

          {/* Back card */}
          <div className="flashcard flashcard--back border-8 border-orange-500">
            {isUpdating ? (
              <LoadingSpinner size="sm" />
            ) : (
              <span className="text-2xl capitalize border-b">
                {flashcardDeck[deckIndex].english}
              </span>
            )}
            <Button
              className="absolute mx-auto bottom-3"
              variant="outline"
              disabled={isUpdating}
              tabIndex={isFlipped ? 0 : -1}
              onClick={() => setIsFlipped((prev) => !prev)}>
              Flip
            </Button>
            <div className="absolute top-0 right-2">
              <Image
                src="/icons/england-flag-96x96.png"
                height={38}
                width={38}
                alt="england flag"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-fit mx-auto mt-12 sm:mt-20 mb-10 flex gap-8">
        <div className="grid grid-cols-1 grid-rows-3 gap-5">
          <span className="text-sm text-neutral-500 text-center self-end">
            Correct
          </span>
          <Button
            className="text-xl bg-green-500 hover:bg-green-600"
            disabled={isUpdating || deckCompleted}
            onClick={() => handleAnswer(4)}>
            Easy
          </Button>
          <Button
            className="text-xl bg-yellow-500 hover:bg-yellow-600"
            disabled={isUpdating || deckCompleted}
            onClick={() => handleAnswer(3)}>
            Medium
          </Button>
        </div>
        <div>
          <Separator orientation="vertical" />
        </div>
        <div className="grid grid-cols-1 grid-rows-3 gap-5">
          <span className="text-sm text-neutral-500 text-center self-end">
            Incorrect
          </span>
          <Button
            className="text-xl bg-orange-500 hover:bg-orange-600"
            disabled={isUpdating || deckCompleted}
            onClick={() => handleAnswer(2)}>
            Hard
          </Button>
          <Button
            className="text-xl bg-red-500 hover:bg-red-600"
            disabled={isUpdating || deckCompleted}
            onClick={() => handleAnswer(1)}>
            No Idea
          </Button>
        </div>
      </div>

      {deckCompleted && (
        <div className="mx-auto w-fit">
          <Button onClick={() => setDialogOpen(true)}>See Game Review</Button>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Deck Complete! 🎉</DialogTitle>
            <DialogDescription>Review your progress:</DialogDescription>
          </DialogHeader>

          <div className="max-h-[400px] overflow-y-auto">
            <table className="w-full">
              <thead className="sticky top-0 bg-white">
                <tr className="border-b">
                  <th className="text-left p-2">Spanish</th>
                  <th className="text-left p-2">English</th>
                  <th className="text-left p-2">Rating</th>
                </tr>
              </thead>
              <tbody>
                {answers.map((answer, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-2">{answer.word}</td>
                    <td className="p-2">{answer.translation}</td>
                    <td className={`p-2 ${getRatingColor(answer.rating)}`}>
                      {answer.rating === 4
                        ? "Easy"
                        : answer.rating === 3
                        ? "Good"
                        : answer.rating === 2
                        ? "Hard"
                        : "No Idea"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <Button variant="outline" onClick={() => router.push("/dashboard")}>
              Finish
            </Button>
            <Button onClick={handleNewDeck}>New Deck</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

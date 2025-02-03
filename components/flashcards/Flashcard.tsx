"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { UserFlashcardAnswer, Word } from "@/lib/types";
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
import { Brain } from "lucide-react";
import { batchUpsertUserFlashcards } from "@/app/actions/flashcards";

type Props = {
  flashcardDeck: Word[];
  userId: number;
};

export default function Flashcard({ flashcardDeck, userId }: Props) {
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
          <div className="flashcard overflow-clip">
            {isUpdating ? (
              <LoadingSpinner size="sm" />
            ) : (
              <span className="font-medium text-3xl capitalize border-b">
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
            <div className="absolute top-1 right-2">
              <Image
                src="/icons/spain-flag-96x96.png"
                height={38}
                width={38}
                alt="spain flag"
              />
            </div>
            <Brain
              size={300}
              strokeWidth={0.75}
              color="#fff3eb"
              className="absolute -z-10 -bottom-20 sm:-bottom-10 -left-[80px]"
            />
          </div>

          {/* Back card */}
          <div className="flashcard flashcard--back">
            {isUpdating ? (
              <LoadingSpinner size="sm" />
            ) : (
              <span className="font-medium text-3xl capitalize border-b">
                {flashcardDeck[deckIndex].english}
                <hr />
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
            <Brain
              size={300}
              strokeWidth={0.75}
              color="#fff3eb"
              className="absolute -z-10 -bottom-20 sm:-bottom-10 -left-[80px]"
            />
          </div>
        </div>
      </div>

      <div className="w-fit mx-auto mt-12 sm:mt-20 mb-10 flex gap-8">
        <div className="grid grid-cols-1 grid-rows-3 gap-5">
          <span className="text-sm text-neutral-500 text-center self-end">
            Correct
          </span>
          <Button
            className="text-lg bg-green-500 hover:bg-green-600"
            disabled={isUpdating || deckCompleted}
            onClick={() => handleAnswer(4)}>
            Easy
          </Button>
          <Button
            className="text-lg bg-yellow-500 hover:bg-yellow-600"
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
            className="text-lg bg-orange-500 hover:bg-orange-600"
            disabled={isUpdating || deckCompleted}
            onClick={() => handleAnswer(2)}>
            Hard
          </Button>
          <Button
            className="text-lg bg-red-500 hover:bg-red-600"
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

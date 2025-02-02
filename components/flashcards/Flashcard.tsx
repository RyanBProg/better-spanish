"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
  const router = useRouter();

  const handleAnswer = async (rating: number) => {
    await upsertUserFlashcard(flashcardDeck[deckIndex].id, userId, rating);
    if (deckIndex === flashcardDeck.length - 1) {
      setDeckCompleted(true);
    } else {
      setDeckIndex((prev) => prev + 1);
      setIsFlipped(false);
    }
  };

  const handleNewDeck = () => {
    router.refresh();
    setDeckIndex(0);
    setIsFlipped(false);
    setDeckCompleted(false);
  };

  return (
    <>
      <Card className="mx-auto h-[450px] w-[350px] p-4 flex flex-col gap-10 items-center">
        {!isFlipped && (
          <span className="mt-20 text-2xl capitalize">
            {flashcardDeck[deckIndex].spanish}
          </span>
        )}
        {isFlipped && (
          <span className="mt-20 text-2xl capitalize">
            {flashcardDeck[deckIndex].english}
          </span>
        )}
        <Button
          className="mt-auto"
          variant="outline"
          onClick={() => setIsFlipped((prev) => !prev)}>
          Flip
        </Button>
        <div className="flex gap-4">
          <div className="grid grid-cols-1 grid-rows-3 gap-4">
            <span className="text-sm text-neutral-500 text-center self-end">
              Correct
            </span>
            <Button
              className="text-xl bg-green-500 hover:bg-green-600"
              onClick={() => handleAnswer(4)}>
              Easy
            </Button>
            <Button
              className="text-xl bg-yellow-500 hover:bg-yellow-600"
              onClick={() => handleAnswer(3)}>
              Medium
            </Button>
          </div>
          <div>
            <Separator orientation="vertical" />
          </div>
          <div className="grid grid-cols-1 grid-rows-3 gap-4">
            <span className="text-sm text-neutral-500 text-center self-end">
              Incorrect
            </span>
            <Button
              className="text-xl bg-orange-500 hover:bg-orange-600"
              onClick={() => handleAnswer(2)}>
              Hard
            </Button>
            <Button
              className="text-xl bg-red-500 hover:bg-red-600"
              onClick={() => handleAnswer(1)}>
              No Idea
            </Button>
          </div>
        </div>
      </Card>

      <Dialog open={deckCompleted} onOpenChange={setDeckCompleted}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deck Complete! 🎉</DialogTitle>
            <DialogDescription>
              Would you like to practice with another set of cards?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4">
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

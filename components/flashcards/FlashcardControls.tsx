import React from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

type Props = {
  isUpdating: boolean;
  deckCompleted: boolean;
  handleAnswer: (rating: number) => Promise<void>;
};

export default function FlashcardControls({
  isUpdating,
  deckCompleted,
  handleAnswer,
}: Props) {
  return (
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
  );
}

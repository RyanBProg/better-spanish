"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState, useTransition } from "react";
import { MultiChoiceUserAnswer, Word } from "@/lib/types";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "../ui/toaster";
import LoadingSpinner from "../common/LoadingSpinner";
import { useRouter } from "next/navigation";
import GameReviewDialog from "./GameReviewDialog";

type Props = {
  error?: string;
  questionData?: Word[];
};

export default function MultiChoiceGame({ error, questionData }: Props) {
  const [answerOptions, setAnswerOptions] = useState<Word[]>([]);
  const [deckIndex, setDeckIndex] = useState(0);
  const [deckCompleted, setDeckCompleted] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [answers, setAnswers] = useState<MultiChoiceUserAnswer[]>([]);
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

  if (!questionData) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "An unexpected error occurred",
    });
    return null;
  }

  useEffect(() => {
    if (!questionData) return;

    // Create copy of array excluding current question
    const availableOptions = [...questionData].filter(
      (_, i) => i !== deckIndex
    );
    const options = [];

    // Get 2 random wrong answers
    for (let i = 0; i < 2; i++) {
      const randomIndex = Math.floor(Math.random() * availableOptions.length);
      options.push(availableOptions.splice(randomIndex, 1)[0]);
    }

    // Add correct answer and shuffle
    options.push(questionData[deckIndex]);
    options.sort(() => Math.random() - 0.5);
    console.log("options: ", options);

    setAnswerOptions(options);
  }, [questionData, deckIndex]);

  const handleAnswer = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isUpdating) return; // Prevent double click

    // Prevent answering when game is complete
    if (deckCompleted) {
      setDialogOpen(true);
      return;
    }

    setIsUpdating(true);
    const userAnswer = e.currentTarget.value;
    const isCorrect = questionData[deckIndex].spanish === userAnswer;
    console.log("questionData: ", questionData[deckIndex]);
    console.log("userAnswer: ", userAnswer);
    console.log("isCorrect: ", isCorrect);
    const newAnswer = {
      word: questionData[deckIndex],
      isCorrect,
      userAnswer,
    };
    setAnswers((prev) => [...prev, newAnswer]);

    if (deckIndex + 1 === 20) {
      setDeckCompleted(true);
      setDialogOpen(true);
    } else {
      setDeckIndex((prev) => prev + 1);
    }

    setIsUpdating(false);
  };

  const handleNewDeck = () => {
    startTransition(() => {
      router.refresh();
      setDeckIndex(0);
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
      <div className="relative mx-auto flex flex-col items-center gap-20 py-28">
        <div className="mx-auto">
          <span className="relative text-2xl">
            {deckIndex + 1}
            <span className="absolute -bottom-1 right-0 translate-x-full text-sm font-light">
              /{questionData.length}
            </span>
          </span>
        </div>
        <span className="mx-auto text-center font-medium text-7xl capitalize border-b">
          {questionData[deckIndex].spanish}
        </span>
        <div className="flex flex-wrap gap-4 justify-center">
          {answerOptions.map((option) => (
            <Button
              key={option.id}
              value={option.spanish}
              onClick={handleAnswer}
              disabled={deckCompleted}
              variant="outline"
              className="w-full p-4 text-lg">
              {option.english}
            </Button>
          ))}
        </div>
      </div>

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

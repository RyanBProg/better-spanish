"use client";

import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { Word } from "@/lib/types";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "../ui/toaster";
import { getQuestion } from "@/app/actions/multi-choice-game";

const initalGameState = {
  score: 0,
  answeredQty: 0,
  selectedAnswer: null as string | null,
};

type Props = {
  error?: string;
  questionData?: Word[];
};

export default function MultiChoiceGame({ error, questionData }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(questionData);
  const [gameState, setGameState] = useState(initalGameState);

  if (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: error,
    });
    return null;
  }

  if (!questionData || !currentQuestion) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "An unexpected error occurred",
    });
    return null;
  }

  const answerOptions = questionData.sort(() => Math.random() - 0.5);

  const handleAnswer = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const userAnswer = e.currentTarget.value;
    if (gameState.selectedAnswer) return;

    const isCorrect = questionData[0].spanish === userAnswer;
    if (isCorrect) {
      setGameState((prev) => ({
        ...prev,
        selectedAnswer: userAnswer,
        answeredQty: prev.answeredQty + 1,
        score: prev.score + 1,
      }));
      toast({
        variant: "default",
        title: "Correct!",
        description: "Good Job",
      });
    } else {
      setGameState((prev) => ({
        ...prev,
        selectedAnswer: userAnswer,
        answeredQty: prev.answeredQty + 1,
      }));

      toast({
        variant: "destructive",
        title: "Incorrect!",
        description: `The correct answer was ${currentQuestion[0].english}`,
      });
    }

    try {
      const questionData = await getQuestion();
      if (!questionData.data) {
        console.error(questionData.error || "An unexpected error occurred");
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred",
        });
        return null;
      }
      setCurrentQuestion(questionData.data);
      setGameState((prev) => ({
        ...prev,
        selectedAnswer: null,
      }));
    } catch (error) {
      return null;
    }
  };

  return (
    <>
      <div className="relative mx-auto flex flex-col items-center gap-20 py-28">
        <div className="mx-auto">
          <span className="mr-2">Score:</span>
          <span className="relative text-2xl">
            {gameState.score}
            <span className="absolute -bottom-1 right-0 translate-x-full text-sm font-light">
              /{gameState.answeredQty}
            </span>
          </span>
        </div>
        <span className="mx-auto text-center font-medium text-7xl capitalize border-b">
          {questionData[0].spanish}
        </span>
        <div className="flex gap-4 justify-center">
          {answerOptions.map((option) => (
            <Button
              key={option.id}
              value={option.spanish}
              onClick={handleAnswer}
              variant="outline"
              className="w-full p-4 text-lg">
              {option.english}
            </Button>
          ))}
        </div>
      </div>
      <Toaster />
    </>
  );
}

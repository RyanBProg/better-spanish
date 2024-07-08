"use client";

import React, { FormEvent, useState } from "react";

type Props = {
  word: string;
  options: string[];
  correctAnswer: string;
};

type AnswerStatus = boolean | undefined;

export default function WordCardTyped({ word, options, correctAnswer }: Props) {
  const [isCorrect, setIsCorrect] = useState<AnswerStatus>(undefined);
  const [userAnswer, setUserAnswer] = useState("");

  const handleAnswer = (e: FormEvent) => {
    e.preventDefault();

    if (userAnswer.toLocaleLowerCase() === correctAnswer.toLocaleLowerCase()) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <>
      <h2 className="text-black font-medium text-3xl mb-10 capitalize">
        {word}
      </h2>
      <hr className="h-[2px] bg-blue-300 absolute left-4 right-4 top-20" />
      {isCorrect === false && (
        <p className="text-red-400 text-sm absolute left-4 top-20">
          Try Again!
        </p>
      )}
      {isCorrect && (
        <p className="text-green-400 text-sm absolute left-4 top-20">
          Correct! The answer is:
          <span className="ml-1 capitalize">{correctAnswer}</span>
        </p>
      )}
      <form className="flex" onSubmit={(e) => handleAnswer(e)}>
        <input
          type="text"
          className="bg-gray-100 text-gray-600 rounded-l-md px-2 py-1 flex-grow min-w-0"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
        />
        <button className="bg-green-700 text-white rounded-r-md px-2 py-1 hover:brightness-110">
          Submit
        </button>
      </form>
    </>
  );
}

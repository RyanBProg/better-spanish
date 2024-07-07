"use client";

import React, { useState } from "react";

type Props = {
  word: string;
  options: string[];
  correctAnswer: string;
};

type AnswerStatus = boolean | undefined;

export default function WordCardMulti({ word, options, correctAnswer }: Props) {
  const [isCorrect, setIsCorrect] = useState<AnswerStatus>(undefined);

  const handleAnswer = (option: string) => {
    if (option === correctAnswer) {
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
      <ul className="flex gap-2">
        {options.map((option) => {
          return (
            <li key={option} className="text-white">
              <button
                className="bg-orange-400 rounded-md px-2 py-1 capitalize hover:brightness-110"
                onClick={() => handleAnswer(option)}>
                {option}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

"use client";

import { useState } from "react";

type AnswerStatus = boolean | undefined;

type TVerbCard = {
  classes: string;
  title: string;
  answer: string;
};

export default function VerbInputCard({ classes, title, answer }: TVerbCard) {
  const [isCorrect, setIsCorrect] = useState<AnswerStatus>(undefined);
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className={`relative border-orange-200 ${classes}`}>
      <div className="mb-8 flex justify-between text-base">
        <label htmlFor="yo" className="font-medium">
          {title}
        </label>
        <button
          className={`${
            showAnswer && "bg-orange-400 text-white"
          } border border-orange-400 text-orange-400 text-sm rounded-md w-[105px] hover:brightness-110`}
          onClick={() => setShowAnswer((prev) => !prev)}>
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </button>
      </div>
      {isCorrect === false && (
        <p className="text-red-500 text-sm font-semibold absolute left-0 top-12 sm:top-6">
          Try Again!
        </p>
      )}
      {isCorrect && (
        <p className="text-green-600 text-sm font-semibold absolute left-0 top-12 sm:top-6">
          Correct! The answer is:
          <span className="ml-1 capitalize">{answer}</span>
        </p>
      )}
      {showAnswer && (
        <span className="text-black capitalize font-normal font-sm absolute right-0 sm:right-6 top-12 sm:top-[26px] z-10">
          {answer}
        </span>
      )}
      <input
        type="text"
        id="yo"
        className="bg-white w-full rounded-sm p-2 text-base drop-shadow-md"
        placeholder="..."
      />
    </div>
  );
}

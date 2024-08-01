"use client";

import { FormEvent, useState } from "react";

type AnswerStatus = boolean | undefined;

type TVerbCard = {
  classes: string;
  title: string;
  answer: string;
};

export default function VerbInputCard({ classes, title, answer }: TVerbCard) {
  const [isCorrect, setIsCorrect] = useState<AnswerStatus>(undefined);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (userAnswer.toLowerCase() === answer.toLowerCase()) {
      setIsCorrect(true);
      setShowAnswer(false);
    } else {
      setIsCorrect(false);
      setShowAnswer(false);
    }
  };

  return (
    <form
      className={`grid grid-cols-[min-content_1fr] grid-rows-[min-content_1fr] gap-x-4 border-white ${classes}`}
      onSubmit={(e) => handleSubmit(e)}
      autoComplete="off">
      <label
        htmlFor="yo"
        className="font-medium text-wrap table-caption w-min [word-spacing:999rem] row-span-2">
        {title}
      </label>
      <div className="flex relative overflow-hidden">
        <input
          id="yo"
          type="text"
          className="bg-white p-2 text-base px-2 py-1 flex-grow min-w-0 h-fit"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          disabled={isCorrect}
        />
        <p
          className={`absolute right-0 py-1 px-2 bg-orange-300 text-white text-center whitespace-nowrap slide-transition ${
            showAnswer ? "slide-in" : "slide-out"
          }`}>
          {answer}
        </p>
      </div>

      <div className="relative flex justify-end gap-1">
        <button
          type="button"
          className={`${
            showAnswer && "bg-orange-400 text-white"
          } border-[1px] border-t-0 border-orange-400 text-orange-400 text-xs rounded-b-md w-[100px] p-2 h-fit transition-colors hover:brightness-110`}
          onClick={() => setShowAnswer((prev) => !prev)}
          disabled={isCorrect}>
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </button>
        <button
          disabled={isCorrect}
          className={`${isCorrect && "bg-gray-300"} ${
            !isCorrect && "bg-green-500 hover:brightness-110"
          } transition-colors text-white rounded-b-md text-xs p-2 h-fit`}>
          Submit
        </button>
        {isCorrect === false && (
          <p className="text-red-500 text-sm font-semibold absolute right-[170px] top-2">
            Try Again!
          </p>
        )}
        {isCorrect && (
          <p className="text-green-600 text-sm font-semibold absolute right-[170px] top-2">
            Correct Answer!
          </p>
        )}
      </div>
    </form>
  );
}

"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { useSettings } from "@/app/context/SettingsContextProvider";

type Props = {
  engWord: string;
  espWord: string;
};

type AnswerStatus = boolean | undefined;

export default function WordCardTyped({ engWord, espWord }: Props) {
  const [isCorrect, setIsCorrect] = useState<AnswerStatus>(undefined);
  const [userAnswer, setUserAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [wordSetup, setWordSetup] = useState({
    visibleWord: espWord,
    answerWord: engWord,
  });
  const { state } = useSettings();

  useEffect(() => {
    setUserAnswer("");
    setShowAnswer(false);
    setIsCorrect(undefined);
  }, [state]);

  useEffect(() => {
    if (state.languageMode === "eng") {
      setWordSetup({
        visibleWord: engWord,
        answerWord: espWord,
      });
    } else {
      setWordSetup({
        visibleWord: espWord,
        answerWord: engWord,
      });
    }
  }, [state.languageMode]);

  const handleAnswer = (e: FormEvent) => {
    e.preventDefault();
    if (
      userAnswer.toLocaleLowerCase() ===
      wordSetup.answerWord.toLocaleLowerCase()
    ) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <>
      <div className="relative flex justify-between">
        <h2 className="text-black font-medium text-3xl mb-10 capitalize">
          {wordSetup.visibleWord}
        </h2>
        <button
          className={`${showAnswer && "bg-red-300"} ${
            !showAnswer && "bg-red-400"
          } w-[105px] h-fit rounded-md px-2 py-1 text-sm text-white transition-colors hover:brightness-110`}
          onClick={() => setShowAnswer((prev) => !prev)}>
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </button>
        {showAnswer && (
          <span className="text-gray-400 capitalize absolute left-0 -top-6">
            {wordSetup.answerWord}
          </span>
        )}
      </div>
      <hr className="h-[2px] bg-gray-300 absolute left-4 right-4 top-20" />
      {isCorrect === false && (
        <p className="text-red-400 text-sm absolute left-4 top-20">
          Try Again!
        </p>
      )}
      {isCorrect && (
        <p className="text-green-400 text-sm absolute left-4 top-20">
          Correct! The answer is:
          <span className="ml-1 capitalize">{wordSetup.answerWord}</span>
        </p>
      )}
      <form className="flex" onSubmit={(e) => handleAnswer(e)}>
        <input
          type="text"
          className="bg-gray-100 text-gray-600 rounded-l-md px-2 py-1 flex-grow min-w-0"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
        />
        <button
          disabled={isCorrect}
          className={`${isCorrect && "bg-gray-300"} ${
            !isCorrect && "bg-green-700 hover:brightness-110"
          } transition-colors text-white rounded-r-md px-2 py-1`}>
          Submit
        </button>
      </form>
    </>
  );
}

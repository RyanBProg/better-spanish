"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { useSettings } from "@/app/context/SettingsContextProvider";
import WordCardTyped from "./WordCardTyped";
import WordCardMulti from "./WordCardMulti";

type Props = {
  espWord: string;
  engWord: string;
  options: numberDataType[];
};

type numberDataType = {
  word: string;
  correctAnswer: string;
};

type AnswerStatus = boolean | undefined;

export default function WordCard({ espWord, engWord, options }: Props) {
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

  const handleSubmit = (e: FormEvent) => {
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

  const handleSelect = (option: string) => {
    if (
      option.toLocaleLowerCase() === wordSetup.answerWord.toLocaleLowerCase()
    ) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <li className="drop-shadow-lg bg-white">
      <div className="relative flex">
        <div className="relative w-full flex items-center bg-gradient-to-bl from-orange-300 to-orange-400 py-8 px-4 gap-2">
          <h2 className="text-white font-bold text-2xl capitalize grow drop-shadow-lg">
            {wordSetup.visibleWord}
          </h2>
          <button
            disabled={isCorrect}
            className={`${showAnswer && "bg-red-400"} ${
              !showAnswer && "bg-red-500"
            } 
            ${
              isCorrect && "bg-gray-300"
            } w-[110px] h-fit rounded-md px-2 py-1 text-sm font-medium text-white drop-shadow-lg transition-colors hover:brightness-110`}
            onClick={() => setShowAnswer((prev) => !prev)}>
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </button>
          {showAnswer && (
            <span className="text-gray-700 capitalize font-medium absolute left-4 top-2 z-10">
              {wordSetup.answerWord}
            </span>
          )}
          {isCorrect === false && (
            <p className="text-red-500 text-sm font-semibold absolute left-4 bottom-2">
              Try Again!
            </p>
          )}
          {isCorrect && (
            <p className="text-green-800 text-sm font-semibold absolute left-4 bottom-2">
              Correct! The answer is:
              <span className="ml-1 capitalize">{wordSetup.answerWord}</span>
            </p>
          )}
        </div>
      </div>
      {state.questionMode === "typed" ? (
        <WordCardTyped
          handleSubmit={handleSubmit}
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
          isDisabled={isCorrect}
        />
      ) : (
        <WordCardMulti
          handleSelect={handleSelect}
          options={options}
          isDisabled={isCorrect}
        />
      )}
    </li>
  );
}

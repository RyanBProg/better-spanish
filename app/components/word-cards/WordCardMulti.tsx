"use client";

import React, { useEffect, useState } from "react";
import { useSettings } from "@/app/context/SettingsContextProvider";
import numberData from "../../data/numbers.json";

type Props = {
  engWord: string;
  espWord: string;
};

type AnswerStatus = boolean | undefined;

export default function WordCardMulti({ engWord, espWord }: Props) {
  const [isCorrect, setIsCorrect] = useState<AnswerStatus>(undefined);
  const [showAnswer, setShowAnswer] = useState(false);
  const [wordSetup, setWordSetup] = useState({
    visibleWord: espWord,
    answerWord: engWord,
  });
  const [answerOptions, setAnswerOptions] = useState<string[]>([]);
  const { state } = useSettings();

  useEffect(() => {
    setShowAnswer(false);
    setIsCorrect(undefined);
  }, [state]);

  useEffect(() => {
    if (state.languageMode === "eng") {
      setWordSetup({
        visibleWord: engWord,
        answerWord: espWord,
      });

      const options = [];
      for (let i = 0; i < 2; i++) {
        options.push(
          numberData[Math.floor(Math.random() * numberData.length)]
            .correctAnswer
        );
      }
      setAnswerOptions([...options, espWord].sort(() => Math.random() - 0.5));
    } else {
      setWordSetup({
        visibleWord: espWord,
        answerWord: engWord,
      });

      const options = [];
      for (let i = 0; i < 2; i++) {
        options.push(
          numberData[Math.floor(Math.random() * numberData.length)].number
        );
      }
      setAnswerOptions([...options, engWord].sort(() => Math.random() - 0.5));
    }
  }, [state.languageMode]);

  const handleAnswer = (option: string) => {
    if (
      option.toLocaleLowerCase() === wordSetup.answerWord.toLocaleLowerCase()
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
      <ul className="flex gap-2">
        {answerOptions.map((option) => (
          <li>
            <button
              disabled={isCorrect}
              className={`${isCorrect && "bg-gray-300"} ${
                !isCorrect && "bg-orange-400 hover:brightness-110"
              } w-fit h-fit rounded-md px-3 py-1 font-semibold text-white transition-colors`}
              onClick={() => handleAnswer(option)}>
              {option}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

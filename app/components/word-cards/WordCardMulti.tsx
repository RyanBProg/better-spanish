"use client";

import React from "react";
import { useSettings } from "@/app/context/SettingsContextProvider";

type Props = {
  handleSelect: (arg0: string) => void;
  isDisabled: boolean | undefined;
  options: numberDataType[];
};

type numberDataType = {
  word: string;
  correctAnswer: string;
};

export default function WordCardMulti({
  handleSelect,
  isDisabled,
  options,
}: Props) {
  const { state } = useSettings();

  return (
    <ul className="flex gap-2 p-4 flex-wrap">
      {options.map((option, index) => (
        <li key={`${option.word}_${option.correctAnswer}_${index}`}>
          {state.languageMode === "esp" ? (
            <button
              disabled={isDisabled}
              className={`${isDisabled && "bg-gray-300"} ${
                !isDisabled &&
                "bg-orange-400 border-orange-500 hover:brightness-110"
              } w-fit h-fit rounded-md px-3 py-1 font-semibold text-white transition-colors border drop-shadow-lg`}
              onClick={() => handleSelect(option.word)}>
              {option.word}
            </button>
          ) : (
            <button
              disabled={isDisabled}
              className={`${isDisabled && "bg-gray-300"} ${
                !isDisabled &&
                "bg-orange-400 border-orange-500 hover:brightness-110"
              } w-fit h-fit rounded-md px-3 py-1 font-semibold text-white transition-colors border drop-shadow-lg`}
              onClick={() => handleSelect(option.correctAnswer)}>
              {option.correctAnswer}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

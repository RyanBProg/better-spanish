"use client";

import WordCardMulti from "../components/WordCardMulti";
import WordCardTyped from "../components/WordCardTyped";
import keywordsData from "../data/keywords.json";
import { useState } from "react";

type AnswerModeType = "multi" | "typed";

export default function Home() {
  const [answerMode, setAnswerMode] = useState<AnswerModeType>("multi");

  const toggleAnswerMode = () => {
    if (answerMode === "multi") {
      setAnswerMode("typed");
    } else {
      setAnswerMode("multi");
    }
  };

  return (
    <main className="px-4 py-10 bg-orange-100">
      <div className="mb-4">
        <p className="text-orange-500 font-semibold text-lg text-center mb-2">
          Answer Mode
        </p>
        <div className="flex justify-center items-center gap-4 p-4 bg-white drop-shadow-md">
          <p
            className={`
          ${answerMode === "multi" ? "text-black" : "text-gray-400"}
          font-medium text-center
            `}>
            Mulitiple
          </p>
          <button
            className="bg-black h-6 w-10 rounded-full px-1 relative"
            onClick={toggleAnswerMode}>
            <div
              className={` ${answerMode === "multi" ? "left-1" : "right-1"}
              absolute h-4 w-4 rounded-full bg-white bottom-1`}></div>
          </button>
          <p
            className={`
          ${answerMode === "typed" ? "text-black" : "text-gray-400"}
          font-medium text-center
            `}>
            Typed
          </p>
        </div>
      </div>
      <ul className="grid grid-cols-1 justify-center items-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {answerMode === "multi" &&
          keywordsData.map((current) => {
            return (
              <li
                key={current.word}
                className="w-full bg-white py-8 px-4 relative drop-shadow-md">
                <WordCardMulti
                  word={current.word}
                  correctAnswer={current.correctAnswer}
                  options={current.options}
                />
              </li>
            );
          })}
        {answerMode === "typed" &&
          keywordsData.map((current) => {
            return (
              <li
                key={current.word}
                className="w-full bg-white py-8 px-4 relative shadow-2xl">
                <WordCardTyped
                  word={current.word}
                  correctAnswer={current.correctAnswer}
                  options={current.options}
                />
              </li>
            );
          })}
      </ul>
    </main>
  );
}

"use client";

import WordCardMulti from "./components/WordCardMulti";
import WordCardTyped from "./components/WordCardTyped";
import keywordsData from "./data/keywords.json";
import { useState } from "react";

type QuestionModeType = "multi" | "typed";

export default function Home() {
  const [questionMode, setQuestionMode] = useState<QuestionModeType>("multi");

  const toggleQuestionMode = () => {
    if (questionMode === "multi") {
      setQuestionMode("typed");
    } else {
      setQuestionMode("multi");
    }
  };

  return (
    <main className="my-8 px-4 bg-teal-50">
      <div className="mb-10 bg-black -my-8 -mx-4 px-4 pt-8 pb-6">
        <p className="text-white font-semibold text-lg text-center mb-2">
          Game Mode
        </p>
        <div className="flex justify-center items-center gap-4 p-4 bg-white rounded-md">
          <p
            className={`
          ${questionMode === "multi" ? "text-black" : "text-gray-400"}
          font-medium text-center
            `}>
            Mulitiple
          </p>
          <button
            className="bg-black h-6 w-10 rounded-full px-1 relative"
            onClick={toggleQuestionMode}>
            <div
              className={` ${questionMode === "multi" ? "left-1" : "right-1"}
              absolute h-4 w-4 rounded-full bg-white bottom-1`}></div>
          </button>
          <p
            className={`
          ${questionMode === "typed" ? "text-black" : "text-gray-400"}
          font-medium text-center
            `}>
            Typed
          </p>
        </div>
      </div>
      <ul className="grid grid-cols-1 justify-center items-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {questionMode === "multi" &&
          keywordsData.map((current) => {
            return (
              <li
                key={current.word}
                className="w-full bg-white py-8 px-4 relative shadow-2xl">
                <WordCardMulti
                  word={current.word}
                  correctAnswer={current.correctAnswer}
                  options={current.options}
                />
              </li>
            );
          })}
        {questionMode === "typed" &&
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

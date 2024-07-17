"use client";

import NumberCardTyped from "../components/number-cards/NumberCardTyped";
import numberData from "../data/numbers.json";
import { useState } from "react";

type WordModeType = "esp" | "eng";

export default function Home() {
  const [wordMode, setWordMode] = useState<WordModeType>("esp");

  const toggleWordMode = () => {
    if (wordMode === "esp") {
      setWordMode("eng");
    } else {
      setWordMode("esp");
    }
  };

  return (
    <main className="px-4 py-10 bg-orange-100">
      <div className="mb-4">
        <p className="text-orange-500 font-semibold text-lg text-center mb-2">
          Word Mode
        </p>
        <div className="flex justify-center items-center gap-4 p-4 bg-white drop-shadow-md">
          <p
            className={`
          ${wordMode === "esp" ? "text-black" : "text-gray-400"}
          font-medium text-center
            `}>
            Spanish
          </p>
          <button
            className="bg-black h-6 w-10 rounded-full px-1 relative"
            onClick={toggleWordMode}>
            <div
              className={` ${wordMode === "esp" ? "left-1" : "right-1"}
              absolute h-4 w-4 rounded-full bg-white bottom-1`}></div>
          </button>
          <p
            className={`
          ${wordMode === "eng" ? "text-black" : "text-gray-400"}
          font-medium text-center
            `}>
            English
          </p>
        </div>
      </div>

      <ul className="grid grid-cols-1 justify-center items-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {numberData
          .map((current) => {
            return (
              <li
                key={current.number}
                className="w-full bg-white py-8 px-4 relative shadow-2xl">
                <NumberCardTyped
                  number={current.number}
                  correctAnswer={current.correctAnswer}
                  wordMode={wordMode}
                />
              </li>
            );
          })
          .sort(() => Math.random() - 0.5)}
      </ul>
    </main>
  );
}

"use client";

import NumberCardTyped from "../components/number-cards/NumberCardTyped";
import numberData from "../data/numbers.json";
import { useState } from "react";
import Settings from "../components/settings/Settings";

export type WordModeType = "esp" | "eng";

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
      <Settings wordMode={wordMode} toggleWordMode={toggleWordMode} />
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

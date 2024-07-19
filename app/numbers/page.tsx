"use client";

import numberData from "../data/numbers.json";
import Settings from "../components/settings/Settings";
import SettingsContextProvider from "../context/SettingsContextProvider";
import { useEffect, useState } from "react";
import WordCardTyped from "../components/word-cards/WordCardTyped";
import WordCardSkeleton from "../components/word-cards/WordCardSkeleton";

type numberDataType = {
  number: string;
  correctAnswer: string;
};

export default function Home() {
  const [shuffledNumberData, setShuffledNumberData] = useState<
    numberDataType[] | undefined
  >(undefined);

  // for shuffling the cards
  useEffect(() => {
    setShuffledNumberData([...numberData.sort(() => Math.random() - 0.5)]);
  }, []);

  // for getting 3 random options of multiple choice
  const getRandomOptions = () => {
    const randomOptions = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * numberData.length);
      randomOptions.push(numberData[randomIndex]);
    }
    return randomOptions;
  };

  return (
    <main className="px-4 py-10 bg-orange-100 min-h-screen">
      <SettingsContextProvider>
        <Settings />
        <ul className="grid grid-cols-1 justify-center items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 mx-auto max-w-[1100px]">
          {!shuffledNumberData ? (
            <>
              <WordCardSkeleton />
              <WordCardSkeleton />
              <WordCardSkeleton />
              <WordCardSkeleton />
            </>
          ) : (
            <>
              {shuffledNumberData.map((current) => {
                return (
                  <li
                    key={current.number}
                    className="w-full bg-white py-8 px-4 relative shadow-2xl">
                    <WordCardTyped
                      engWord={current.number}
                      espWord={current.correctAnswer}
                    />
                  </li>
                );
              })}
            </>
          )}
        </ul>
      </SettingsContextProvider>
    </main>
  );
}

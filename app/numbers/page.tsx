"use client";

import NumberCardTyped from "../components/number-cards/NumberCardTyped";
import numberData from "../data/numbers.json";
import Settings from "../components/settings/Settings";
import SettingsContextProvider from "../context/SettingsContextProvider";
import { useEffect, useState } from "react";
import NumberCardSkeleton from "../components/number-cards/NumberCardSkeleton";

type numberDataType = {
  number: string;
  correctAnswer: string;
};

export default function Home() {
  const [shuffledNumberData, setShuffledNumberData] = useState<
    numberDataType[] | undefined
  >(undefined);

  useEffect(() => {
    setShuffledNumberData([...numberData.sort(() => Math.random() - 0.5)]);
  }, []);

  return (
    <main className="px-4 py-10 bg-orange-100 min-h-screen">
      <SettingsContextProvider>
        <Settings />
        <ul className="grid grid-cols-1 justify-center items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 mx-auto max-w-[1100px]">
          {!shuffledNumberData ? (
            <>
              <NumberCardSkeleton />
              <NumberCardSkeleton />
            </>
          ) : (
            <>
              {shuffledNumberData.map((current) => {
                return (
                  <li
                    key={current.number}
                    className="w-full bg-white py-8 px-4 relative shadow-2xl">
                    <NumberCardTyped
                      number={current.number}
                      correctAnswer={current.correctAnswer}
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

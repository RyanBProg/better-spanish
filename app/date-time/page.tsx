"use client";

import datesData from "../data/dates.json";
import Settings from "../components/settings/Settings";
import SettingsContextProvider from "../context/SettingsContextProvider";
import { useEffect, useState } from "react";
import WordCard from "../components/word-cards/WordCard";
import WordCardSkeleton from "../components/word-cards/WordCardSkeleton";
import { useSettings } from "@/app/context/SettingsContextProvider";
import { DataType } from "../types/types";
import { generateOptions } from "../utils/generateOptions";

export default function Home() {
  return (
    <main className="px-4 py-10 bg-orange-100 min-h-screen">
      <SettingsContextProvider>
        <div className="flex justify-between mx-auto max-w-[1100px]">
          <h2 className="text-2xl text-orange-500 font-medium">
            Date/Time Quiz
          </h2>
          <Settings />
        </div>
        <WordCardList />
      </SettingsContextProvider>
    </main>
  );
}

function WordCardList() {
  const [shuffledNumberData, setShuffledNumberData] = useState<
    DataType[] | undefined
  >(undefined);
  const { state } = useSettings();

  useEffect(() => {
    setShuffledNumberData([...datesData].sort(() => Math.random() - 0.5));
  }, []);

  if (!shuffledNumberData) {
    return (
      <ul className="grid grid-cols-1 justify-center items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 mx-auto max-w-[1100px]">
        {[...Array(4)].map((_, index) => (
          <WordCardSkeleton key={index} />
        ))}
      </ul>
    );
  }

  return (
    <ul className="grid grid-cols-1 justify-center items-start gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-[1250px]">
      {shuffledNumberData.map((current) => (
        <WordCard
          key={current.word}
          engWord={current.word}
          espWord={current.correctAnswer}
          options={generateOptions(current, datesData)}
        />
      ))}
    </ul>
  );
}

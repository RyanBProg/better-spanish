"use client";

import NumberCardTyped from "../components/number-cards/NumberCardTyped";
import numberData from "../data/numbers.json";
import Settings from "../components/settings/Settings";
import SettingsContextProvider from "../context/SettingsContextProvider";

export default function Home() {
  return (
    <main className="px-4 py-10 bg-orange-100">
      <SettingsContextProvider>
        <Settings />
        <ul className="grid grid-cols-1 justify-center items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 mx-auto max-w-[1100px]">
          {numberData
            .map((current) => {
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
            })
            .sort(() => Math.random() - 0.5)}
        </ul>
      </SettingsContextProvider>
    </main>
  );
}

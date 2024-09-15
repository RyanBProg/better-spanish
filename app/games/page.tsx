"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import controllerIcon from "../../public/icons/console-controller.svg";

const gameFilters = ["multi-choice", "verbs", "spelling", "flashcards"];

const games = [
  {
    name: "question words",
    description: "Helpful keywords for everyday speaking",
    filters: ["multi-choice", "spelling"],
    link: "/games/keywords",
  },
  {
    name: "verbs conjugations",
    description: "Helpful keywords for everyday speaking",
    filters: ["verbs", "spelling"],
    link: "/games/verbs",
  },
  {
    name: "flashcards",
    description: "Helpful keywords for everyday speaking",
    filters: ["flashcards"],
    link: "/games/flashcards",
  },
  {
    name: "date/time words",
    description: "Helpful keywords for everyday speaking",
    filters: ["multi-choice", "spelling"],
    link: "/games/date-time",
  },
  {
    name: "numbers",
    description: "Helpful keywords for everyday speaking",
    filters: ["multi-choice", "spelling"],
    link: "/games/numbers",
  },
];

export default function Home() {
  const [filterList, setFilterList] = useState<string[]>(gameFilters);

  const handleFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    setFilterList([target.value]);
  };

  const handleResetFilters = () => {
    setFilterList(gameFilters);
  };

  return (
    <div className="">
      <h1 className="text-4xl font-semibold">Games</h1>
      <hr className="w-full h-[2px] bg-orange-200 mt-2 mb-4" />
      <FilterBar
        filterList={filterList}
        handleFilter={handleFilter}
        handleResetFilters={handleResetFilters}
      />
      <div className="grid gap-4 mt-4">
        {games
          .filter((game) =>
            filterList.some((filter) => game.filters.includes(filter))
          )
          .map((game) => (
            <Link href={game.link} key={game.name} className="max-w-[800px]">
              <div className="bg-orange-200 py-10 px-6 text-left rounded-lg drop-shadow-sm transition-transform hover:-translate-y-1">
                <div className="flex flex-col sm:flex-row items-center gap-2 mb-4">
                  <Image src={controllerIcon} alt="" className="size-6" />
                  <h3 className="font-semibold text-2xl capitalize flex-1">
                    {game.name}
                  </h3>
                  <div className="flex gap-2">
                    {game.filters.map((filter) => (
                      <span className="bg-slate-100 rounded-full py-1 px-3">
                        {filter}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-neutral-700 text-center sm:text-left">
                  {game.description}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

type FilterProps = {
  filterList: string[];
  handleFilter: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleResetFilters: () => void;
};

function FilterBar({
  filterList,
  handleFilter,
  handleResetFilters,
}: FilterProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {filterList.map((filter) => {
        return (
          <div className="flex items-center">
            <button
              value={filter}
              onClick={handleFilter}
              disabled={filterList.length === 1}
              className={`${
                filterList.length === 1 ? "rounded-l-full" : "rounded-full"
              } bg-slate-200 py-1 px-3 transition-[filter] hover:brightness-95`}>
              {filter}
            </button>
            {filterList.length === 1 && (
              <button
                onClick={handleResetFilters}
                className="bg-black text-white rounded-r-full h-[32px] w-fit pl-2 pr-3 text-sm">
                X
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

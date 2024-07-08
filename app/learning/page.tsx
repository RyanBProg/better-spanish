"use client";

import Image from "next/image";
import arrowIcon from "../../public/images/icon-arrow.svg";
import colorsImage from "../../public/images/cheat-sheets/colors/spanish-colors-colores.jpg";
import { useState } from "react";

export default function Home() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <main className="px-4 py-10 bg-orange-100">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-center mb-2">
          Learn more spanish words
        </h1>
        <p className="text-orange-500 text-center">
          Get to grips with plenty of common spanish words with our handy cheat
          sheets
        </p>
      </div>
      <div>
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold">Colors</h3>
          <button onClick={() => setDropdownOpen((prev) => !prev)}>
            <Image
              src={arrowIcon}
              alt="arrow icon"
              width={20}
              height={20}
              className={`${dropdownOpen && "rotate-180"}`}
            />
          </button>
        </div>
        {dropdownOpen && (
          <Image
            src={colorsImage}
            alt="spanish colors cheat sheet"
            className="mt-4"
          />
        )}
        <hr className="w-full h-[3px] bg-orange-200 my-3" />
      </div>
    </main>
  );
}

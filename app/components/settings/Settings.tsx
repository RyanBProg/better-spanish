"use client";

import React, { useState } from "react";
import settingsIcon from "../../../public/images/icons/setting.png";
import Image from "next/image";
import { WordModeType } from "@/app/numbers/page";

type Props = {
  wordMode: WordModeType;
  toggleWordMode: () => void;
};

export default function Settings({ wordMode, toggleWordMode }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full relative mb-10">
      <button className="block ml-auto" onClick={() => setIsOpen(true)}>
        <Image src={settingsIcon} alt="settings icon" className="size-5 mr-3" />
      </button>
      {isOpen && (
        <div className="absolute bg-white drop-shadow-md p-4 z-10 rounded-md right-0 -top-5 w-96">
          <div className="flex justify-between">
            <h3 className="text-orange-500 font-medium">Settings</h3>
            <button className="text-xl" onClick={() => setIsOpen(false)}>
              &times;
            </button>
          </div>
          <hr className="my-4" />
          <div>
            <p className="text-sm mb-2 font-normal">Word Mode</p>
            <div className="flex items-center gap-4">
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
          <hr className="my-4" />
        </div>
      )}
    </div>
  );
}

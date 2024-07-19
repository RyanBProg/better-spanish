"use client";

import React, { useState } from "react";
import settingsIcon from "../../../public/images/icons/setting.png";
import Image from "next/image";
import { useSettings } from "@/app/context/SettingsContextProvider";

export default function Settings() {
  const { state, dispatch } = useSettings();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-fit relative mb-10">
      <button className="block ml-auto" onClick={() => setIsOpen(true)}>
        <Image
          src={settingsIcon}
          alt="settings icon"
          className="size-6 mr-3 hover:motion-safe:animate-spin"
        />
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
          ${state.languageMode === "esp" ? "text-black" : "text-gray-400"}
          font-medium text-center
            `}>
                Spanish
              </p>
              <button
                className="bg-black h-6 w-10 rounded-full px-1 relative"
                onClick={() => dispatch({ type: "toggle_language" })}>
                <div
                  className={` ${
                    state.languageMode === "esp" ? "left-1" : "right-1"
                  }
              absolute h-4 w-4 rounded-full bg-white bottom-1`}></div>
              </button>
              <p
                className={`
          ${state.languageMode === "eng" ? "text-black" : "text-gray-400"}
          font-medium text-center
            `}>
                English
              </p>
            </div>
          </div>
          <hr className="my-4" />
          <div>
            <p className="text-sm mb-2 font-normal">Question Mode</p>
            <div className="flex items-center gap-4">
              <p
                className={`
          ${state.questionMode === "typed" ? "text-black" : "text-gray-400"}
          font-medium text-center
            `}>
                Typed Input
              </p>
              <button
                className="bg-black h-6 w-10 rounded-full px-1 relative"
                onClick={() => dispatch({ type: "toggle_questionMode" })}>
                <div
                  className={` ${
                    state.questionMode === "typed" ? "left-1" : "right-1"
                  }
              absolute h-4 w-4 rounded-full bg-white bottom-1`}></div>
              </button>
              <p
                className={`
          ${state.questionMode === "multi" ? "text-black" : "text-gray-400"}
          font-medium text-center
            `}>
                Multiple Choice
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

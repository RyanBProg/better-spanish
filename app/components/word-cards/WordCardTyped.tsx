"use client";

import React, { FormEvent } from "react";

type Props = {
  handleSubmit: (e: FormEvent) => void;
  userAnswer: string;
  setUserAnswer: React.Dispatch<React.SetStateAction<string>>;
  isDisabled: boolean | undefined;
};

export default function WordCardTyped({
  handleSubmit,
  userAnswer,
  setUserAnswer,
  isDisabled,
}: Props) {
  return (
    <form className="flex p-4" onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        className="bg-gray-100 text-gray-700 border border-gray-300 font-medium rounded-l-md px-2 py-1 flex-grow min-w-0"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
      />
      <button
        disabled={isDisabled}
        className={`${isDisabled && "bg-gray-300"} ${
          !isDisabled && "bg-green-700 hover:brightness-110"
        } transition-colors text-white font-medium rounded-r-md px-2 py-1`}>
        Submit
      </button>
    </form>
  );
}

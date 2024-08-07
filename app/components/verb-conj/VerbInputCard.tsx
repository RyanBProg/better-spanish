"use client";

import { useState } from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { TFormInput } from "./VerbConj";

type TVerb = {
  prefix?: string | string[];
  spanish: string;
  english: string;
  type?: string;
};

type TVerbCard = {
  classes: string;
  verb: TVerb;
  register: UseFormRegister<TFormInput>;
  errors: FieldErrors;
  isSubmitted: boolean;
};

export default function VerbInputCard({
  classes,
  verb,
  register,
  errors,
  isSubmitted,
}: TVerbCard) {
  const [showAnswer, setShowAnswer] = useState(false);

  const getInputName = () => {
    if (Array.isArray(verb.prefix)) {
      return `${verb.prefix[0]}_${verb.spanish}`;
    } else if (!verb.prefix) {
      return `${verb.spanish}`;
    } else {
      return `${verb.prefix}_${verb.spanish}`;
    }
  };

  const inputName = getInputName();

  return (
    <div
      className={`grid grid-cols-[min-content_1fr] grid-rows-[min-content_1fr] gap-x-4 border-white py-6 ${classes}`}>
      <label
        htmlFor={inputName}
        className="font-medium text-wrap table-caption w-min [word-spacing:999rem] row-span-2">
        {Array.isArray(verb.prefix) ? verb.prefix.join(" ") : verb.prefix}
      </label>
      <div className="flex relative overflow-hidden">
        <input
          id={inputName}
          type="text"
          className="bg-white p-2 text-base px-2 py-1 flex-grow min-w-0 h-fit"
          {...register(inputName, {
            required: "Field is required",
            validate: (value) =>
              value.toLocaleLowerCase() === verb.spanish.toLocaleLowerCase() ||
              "Incorrect answer",
          })}
        />
        <p
          className={`absolute right-0 py-1 px-2 bg-orange-300 text-white text-center whitespace-nowrap slide-transition ${
            showAnswer ? "slide-in" : "slide-out"
          }`}>
          {verb.spanish}
        </p>
      </div>
      <div className="relative flex justify-end gap-1">
        <button
          type="button"
          className={`${
            showAnswer && "bg-orange-300"
          } bg-orange-400 text-white text-xs w-[95px] py-[3px] h-fit transition-colors hover:brightness-110`}
          onClick={() => setShowAnswer((prev) => !prev)}>
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </button>
        {errors[inputName] && (
          <p className="text-red-500 text-sm font-semibold absolute right-[110px] top-1">
            {errors[inputName]?.message?.toString()}
          </p>
        )}
        {isSubmitted && !errors[inputName] && (
          <p className="text-green-500 text-sm font-semibold absolute right-[110px] top-1">
            Correct
          </p>
        )}
      </div>
    </div>
  );
}

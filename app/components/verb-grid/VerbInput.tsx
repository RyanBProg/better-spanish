import { useState, useEffect } from "react";
import {
  FieldErrors,
  FieldValues,
  UseFormClearErrors,
  UseFormRegister,
} from "react-hook-form";

type TVerb = {
  prefix?: string | string[];
  spanish: string;
  english: string;
  type?: string;
};

type Props = {
  id: string;
  className?: string;
  verb: TVerb;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  clearErrors: UseFormClearErrors<FieldValues>;
  isSubmitted: boolean;
};

export default function VerbInput({
  id,
  className = "",
  verb,
  register,
  errors,
  clearErrors,
  isSubmitted,
}: Props) {
  const [showAnswer, setShowAnswer] = useState(false);

  // resets ui after submission
  useEffect(() => {
    setShowAnswer(false);
  }, [isSubmitted]);

  return (
    <div className={`${className} relative m-2`}>
      <input
        type="text"
        {...register(id, {
          required: "Required",
          validate: {
            isCorrect: (value) =>
              value.toLocaleLowerCase() === verb.spanish.toLocaleLowerCase() ||
              "Incorrect",
          },
          onChange: (e) => {
            clearErrors(id); // Clear errors on user input
          },
        })}
        className={`w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none ${
          errors[`${id}`] ? "border-red-500 bg-red-200" : "border-gray-300"
        }`}
      />
      <button
        type="button"
        tabIndex={-1}
        disabled={isSubmitted}
        onClick={() => setShowAnswer((prev) => !prev)}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-orange-500 text-white size-5 text-xs hover:bg-orange-600 transition-colors">
        ?
      </button>
      <span
        className={`${
          showAnswer ? "inline" : "hidden"
        } absolute right-[35px] top-1/2 -translate-y-1/2`}>
        {verb.spanish}
      </span>
      {errors[`${id}`] && (
        <span className="text-xs text-white absolute top-0 left-1/2 -translate-x-1/2">
          {errors[`${id}`]?.message as string}
        </span>
      )}
    </div>
  );
}

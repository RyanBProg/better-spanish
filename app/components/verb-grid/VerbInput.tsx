import { useState, useEffect } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

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
  isSubmitted: boolean;
};

export default function VerbInput({
  id,
  className = "",
  verb,
  register,
  errors,
  isSubmitted,
}: Props) {
  const [showAnswer, setShowAnswer] = useState(false);

  // resets ui after submission
  useEffect(() => {
    setShowAnswer(false);
  }, [isSubmitted]);

  return (
    <div className={`${className} relative p-2`}>
      <input
        type="text"
        {...register(id, {
          required: "Required",
        })}
        className={`w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none ${
          errors[`${id}`] ? "border-red-500" : "border-gray-300"
        }`}
      />
      <button
        type="button"
        disabled={isSubmitted}
        onClick={() => setShowAnswer((prev) => !prev)}
        className="absolute right-4 top-[19px] rounded-full bg-orange-500 text-white size-5 text-xs hover:bg-orange-600 transition-colors">
        ?
      </button>
      <span
        className={`${
          showAnswer ? "inline" : "hidden"
        } absolute right-[42px] top-[16px]`}>
        {verb.spanish}
      </span>
      {errors[`${id}`] && (
        <span className="text-xs text-red-500 absolute top-[21px] left-4">
          Required
        </span>
      )}
    </div>
  );
}

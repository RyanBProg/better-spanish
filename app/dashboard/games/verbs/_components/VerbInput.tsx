import { TVerb } from "@/app/types/types";
import {
  FieldErrors,
  FieldValues,
  UseFormClearErrors,
  UseFormRegister,
} from "react-hook-form";

type Props = {
  id: string;
  className?: string;
  verb: TVerb;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  clearErrors: UseFormClearErrors<FieldValues>;
  showAnswers: boolean;
};

export default function VerbInput({
  id,
  className = "",
  verb,
  register,
  errors,
  clearErrors,
  showAnswers,
}: Props) {
  return (
    <div className={`${className} relative m-1`}>
      <input
        type="text"
        {...register(id, {
          required: "Required",
          validate: {
            isCorrect: (value) =>
              value.toLocaleLowerCase() === verb.spanish.toLocaleLowerCase() ||
              "Incorrect",
          },
          onChange: () => errors[`${id}`] && clearErrors(id),
        })}
        className={`w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-orange-400 focus:outline-none ${
          errors[`${id}`] ? "border-red-500 bg-red-200" : "border-gray-300"
        }`}
      />
      <span
        className={`${
          showAnswers ? "inline" : "hidden"
        } absolute right-2 top-1/2 -translate-y-1/2`}>
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

import {
  FieldErrors,
  FieldValues,
  UseFormClearErrors,
  UseFormRegister,
} from "react-hook-form";
import VerbInnerGrid from "./VerbInnerGrid";
import { VerbConjugation } from "@/lib/types";

type Props = {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  verb: VerbConjugation;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
  showAnswers: boolean;
};

export default function VerbForm({
  onSubmit,
  verb,
  register,
  errors,
  clearErrors,
  showAnswers,
}: Props) {
  const presentTense = verb.verbData.filter((word) => word.tense === "present");
  const pastTense = verb.verbData.filter((word) => word.tense === "past");
  const futureTense = verb.verbData.filter((word) => word.tense === "future");

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
      className="my-10 flex flex-col gap-4">
      <VerbInnerGrid
        verbTense={presentTense}
        title="present"
        register={register}
        errors={errors}
        clearErrors={clearErrors}
        showAnswers={showAnswers}
      />
      <VerbInnerGrid
        verbTense={pastTense}
        title="past"
        register={register}
        errors={errors}
        clearErrors={clearErrors}
        showAnswers={showAnswers}
      />
      <VerbInnerGrid
        verbTense={futureTense}
        title="future"
        register={register}
        errors={errors}
        clearErrors={clearErrors}
        showAnswers={showAnswers}
      />

      {/* Submit button */}
      <button
        type="submit"
        className="bg-green-500 text-white py-2 px-6 rounded-md shadow-lg hover:bg-green-600 transition-colors duration-200">
        Submit Answers
      </button>
    </form>
  );
}

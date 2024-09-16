import {
  FieldErrors,
  FieldValues,
  UseFormClearErrors,
  UseFormRegister,
} from "react-hook-form";
import VerbInnerGrid from "./VerbInnerGrid";
import VerbInput from "./VerbInput";
import { Verb } from "@/app/types/types";

type Props = {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  verb: Verb;
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
  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
      className="my-10 flex flex-col gap-4">
      <VerbInnerGrid
        verbTense={verb.present}
        title="present"
        register={register}
        errors={errors}
        clearErrors={clearErrors}
        showAnswers={showAnswers}
      />
      <VerbInnerGrid
        verbTense={verb.past}
        title="past"
        register={register}
        errors={errors}
        clearErrors={clearErrors}
        showAnswers={showAnswers}
      />
      <VerbInnerGrid
        verbTense={verb.future}
        title="future"
        register={register}
        errors={errors}
        clearErrors={clearErrors}
        showAnswers={showAnswers}
      />

      {/* Gerund */}
      <div className="grid grid-cols-[min-content_1fr] gap-x-4 my-10">
        <span className="font-semibold text-gray-800 flex items-center sm:text-nowrap text-xs sm:text-base">
          Gerund
        </span>
        <VerbInput
          id={`${verb.gerund.spanish}`}
          className={""}
          verb={verb.gerund}
          register={register}
          errors={errors}
          clearErrors={clearErrors}
          showAnswers={showAnswers}
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="bg-green-500 text-white py-2 px-6 rounded-md shadow-lg hover:bg-green-600 transition-colors duration-200">
        Submit Answers
      </button>
    </form>
  );
}

import { TVerb } from "@/app/types/types";
import {
  FieldErrors,
  FieldValues,
  UseFormClearErrors,
  UseFormRegister,
} from "react-hook-form";
import VerbInput from "./VerbInput";

type Props = {
  verbTense: Array<TVerb>;
  title: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
  showAnswers: boolean;
};

export default function VerbInnerGrid({
  verbTense,
  title,
  register,
  errors,
  clearErrors,
  showAnswers,
}: Props) {
  return (
    <div className="verb-inner-grid">
      {/* heading row */}
      <span></span>
      <span className="uppercase text-center h-min text-gray-600 self-center">
        {title}
      </span>

      {/* Row Labels */}
      <span className="font-semibold text-gray-800 flex items-center col-start-1 row-start-2 text-xs sm:text-base">
        Yo
      </span>
      <span className="font-semibold text-gray-800 flex items-center col-start-1 row-start-3 text-xs sm:text-base">
        Tú
      </span>
      <span className="font-semibold text-gray-800 flex items-center col-start-1 row-start-4 text-xs sm:text-base">
        Él/Ella/ Usted
      </span>
      <span className="font-semibold text-gray-800 flex items-center col-start-1 row-start-5 text-wrap sm:text-nowrap text-xs sm:text-base">
        Nosotros/ Nosotras
      </span>
      <span className="font-semibold text-gray-800 flex items-center col-start-1 row-start-6 text-wrap sm:text-nowrap text-xs sm:text-base">
        Vosotros/ Vosotras
      </span>
      <span className="font-semibold text-gray-800 flex items-center col-start-1 row-start-7 text-wrap sm:text-nowrap text-xs sm:text-base">
        Ellos/Ellas/ Ustedes
      </span>

      {/* Input fields */}
      {verbTense.map((verb, index) => {
        return (
          <VerbInput
            key={verb.spanish}
            id={`${verb.spanish}${index}`}
            className={`col-start-2 row-start-${index + 2}`}
            verb={verb}
            register={register}
            errors={errors}
            clearErrors={clearErrors}
            showAnswers={showAnswers}
          />
        );
      })}
    </div>
  );
}

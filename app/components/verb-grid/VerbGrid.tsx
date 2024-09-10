"use client";

import {
  FieldErrors,
  FieldValues,
  useForm,
  UseFormClearErrors,
  UseFormRegister,
} from "react-hook-form";
import verbData from "../../data/verbs.json";
import VerbInput, { TVerb } from "./VerbInput";
import { useState } from "react";

export default function VerbGrid() {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm();

  const [showAnswers, setShowAnswers] = useState(false);

  const [verbIndex, setVerbIndex] = useState(
    Math.floor(Math.random() * verbData.length)
  );

  const handleGameSetup = (verbData: any, verbIndex: number) => {
    const tenses = ["present", "past", "future"];
    let state: Record<string, { answer: string; correctAnswer: string }> = {};

    tenses.forEach((tense, tenseIndex) => {
      for (let i = 0; i < 6; i++) {
        const key = `v${tenseIndex * 6 + i + 1}`;
        state[key] = {
          answer: "",
          correctAnswer: verbData[verbIndex][tense][i].spanish,
        };
      }
    });

    return state;
  };

  const [gameState, setGameState] = useState(
    handleGameSetup(verbData, verbIndex)
  );

  const handleAnswer = (verbNo: string, answer: string) => {
    setGameState((prev) => {
      const newState = { ...prev };
      newState[verbNo] = { ...newState[verbNo], answer: answer };
      return newState;
    });
  };

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    alert("You Answered All Correct!");
  });

  const getNewRandomVerb = () => {
    setVerbIndex(Math.floor(Math.random() * verbData.length));
    reset();
  };

  const resetVerb = () => {
    reset();
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="overflow-y-scroll flex-1">
          <div className="mb-5">
            <h1 className="font-semibold">Verb Conjugations</h1>
            <p className="mb-10">
              Answer all 6 verb conjugations for all 3 tenses and the gerund
              conjugation correctly to move onto the next verb.
            </p>
            <h2 className="text-4xl font-semibold capitalize">
              {verbData[verbIndex].spanish}
              <span className="text-base ml-2">
                {" "}
                - {verbData[verbIndex].english}
              </span>
            </h2>
          </div>
          <form
            noValidate
            autoComplete="off"
            onSubmit={onSubmit}
            className="my-10 flex flex-col gap-4">
            <InnerGrid
              verbTense={verbData[verbIndex].present}
              title="present"
              register={register}
              errors={errors}
              clearErrors={clearErrors}
              showAnswers={showAnswers}
            />
            <InnerGrid
              verbTense={verbData[verbIndex].past}
              title="past"
              register={register}
              errors={errors}
              clearErrors={clearErrors}
              showAnswers={showAnswers}
            />
            <InnerGrid
              verbTense={verbData[verbIndex].future}
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
                id={`${verbData[verbIndex].gerund}`}
                className={""}
                verb={verbData[verbIndex].gerund}
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
        </div>

        <Controls />
      </div>
    </>
  );
}

type InnerGridProps = {
  verbTense: Array<TVerb>;
  title: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
  showAnswers: boolean;
};

function InnerGrid({
  verbTense,
  title,
  register,
  errors,
  clearErrors,
  showAnswers,
}: InnerGridProps) {
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

function Controls() {
  return (
    <div className="bg-white grid grid-cols-2 grid-rows-2 md:grid-cols-3 md:grid-rows-1 gap-2 pt-2 sm:pt-3 md:pt-4 border-t-2">
      <select className="col-span-2 md:col-span-1 rounded-md w-full shadow-sm p-2 border">
        <option value="">Select a new verb</option>
      </select>
      <button className="bg-neutral-700 w-full text-white py-2 rounded-md hover:brightness-150 transition-[filter] duration-200">
        Show Answers
      </button>
      <button
        type="button"
        className="bg-neutral-700 w-full text-white py-2 rounded-md hover:brightness-150 transition-[filter] duration-200">
        Random Verb
      </button>
    </div>
  );
}

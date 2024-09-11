"use client";

import { useForm } from "react-hook-form";
import verbData from "../../../data/verbs.json";
import VerbInput from "./VerbInput";
import { useState } from "react";
import GameControls from "./GameControls";
import VerbInnerGrid from "./VerbInnerGrid";

export default function VerbGrid() {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const [showAnswers, setShowAnswers] = useState(false);
  const [verbIndex, setVerbIndex] = useState(0);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    alert("You Answered All Correct!");
  });

  const getNewRandomVerb = () => {
    setVerbIndex(Math.floor(Math.random() * verbData.length));
    setShowAnswers(false);
    reset();
  };

  const handleVerbChange = (verb: string) => {
    setShowAnswers(false);
    reset();
    setVerbIndex(verbData.findIndex((item) => item.spanish === verb));
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
            <VerbInnerGrid
              verbTense={verbData[verbIndex].present}
              title="present"
              register={register}
              errors={errors}
              clearErrors={clearErrors}
              showAnswers={showAnswers}
            />
            <VerbInnerGrid
              verbTense={verbData[verbIndex].past}
              title="past"
              register={register}
              errors={errors}
              clearErrors={clearErrors}
              showAnswers={showAnswers}
            />
            <VerbInnerGrid
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
                id={`${verbData[verbIndex].gerund.spanish}`}
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

        <GameControls
          setShowAnswers={setShowAnswers}
          showAnswers={showAnswers}
          getNewRandomVerb={getNewRandomVerb}
          verbList={verbData.map((verb) => verb.spanish)}
          currentVerb={verbData[verbIndex].spanish}
          handleVerbChange={handleVerbChange}
        />
      </div>
    </>
  );
}

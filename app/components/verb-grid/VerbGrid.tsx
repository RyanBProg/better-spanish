"use client";

import { useForm } from "react-hook-form";
import verbData from "../../data/verbs.json";
import VerbInput from "./VerbInput";
import { useState } from "react";

export default function VerbGrid() {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm();

  const [isSubmitted, setIsSubmitted] = useState(false);
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
    setIsSubmitted(true);
    alert("You Answered All Correct!");
  });

  const handleNewVerb = () => {
    setVerbIndex(Math.floor(Math.random() * verbData.length));
    setIsSubmitted(false);
    reset();
  };

  const resetVerb = () => {
    setIsSubmitted(false);
    reset();
  };

  return (
    <>
      <div className="mb-5">
        <h1 className="font-semibold">Verb Conjugations</h1>
        <p className="mb-5">
          Answer all 6 verb conjugations for all 3 tenses and the gerund
          conjugation correctly to move onto the next verb.
        </p>
        <form onSubmit={(e) => console.log(e)}>
          <select className="mb-10 mr-4 rounded-md shadow-sm p-2 border">
            <option value="">Select a new verb</option>
            {verbData.map((verb) => {
              return <option value={verb.spanish}>{verb.spanish}</option>;
            })}
          </select>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-6 rounded-md shadow-lg hover:bg-green-600 transition duration-200">
            Change Verb
          </button>
        </form>
        <h2 className="text-4xl font-semibold capitalize">
          {verbData[verbIndex].spanish}
          <span className="text-base ml-2">
            {" "}
            - {verbData[verbIndex].english}
          </span>
        </h2>
      </div>

      <form noValidate autoComplete="off" onSubmit={onSubmit}>
        <div className="conj-grid">
          {/* Headers */}
          <span></span>
          <span className="uppercase text-center text-gray-600">Present</span>
          <span className="uppercase text-center text-gray-600">Past</span>
          <span className="uppercase text-center text-gray-600">Future</span>

          {/* Row Labels */}
          <span className="font-semibold text-gray-800 flex items-center row-start-2 overflow-x-hidden">
            Yo
          </span>
          <span className="font-semibold text-gray-800 flex items-center row-start-3 overflow-x-hidden">
            Tú
          </span>
          <span className="font-semibold text-gray-800 flex items-center row-start-4 overflow-x-hidden">
            Él/Ella/Usted
          </span>
          <span className="font-semibold text-gray-800 flex items-center row-start-5 overflow-x-hidden">
            Nosotros/Nosotras
          </span>
          <span className="font-semibold text-gray-800 flex items-center row-start-6 overflow-x-hidden">
            Vosotros/Vosotras
          </span>
          <span className="font-semibold text-gray-800 flex items-center row-start-7 overflow-x-hidden">
            Ellos/Ellas/Ustedes
          </span>

          {/* Input fields */}
          {verbData[verbIndex].present.map((verb, index) => {
            return (
              <VerbInput
                id={`v${index + 1}`}
                className={`col-start-2 col-span1 row-start-${index + 2}`}
                verb={verb}
                register={register}
                errors={errors}
                clearErrors={clearErrors}
                isSubmitted={isSubmitted}
              />
            );
          })}
          {verbData[verbIndex].past.map((verb, index) => {
            return (
              <VerbInput
                id={`v${index + 7}`}
                className={`col-start-3 col-span1 row-start-${index + 2}`}
                verb={verb}
                register={register}
                errors={errors}
                clearErrors={clearErrors}
                isSubmitted={isSubmitted}
              />
            );
          })}
          {verbData[verbIndex].future.map((verb, index) => {
            return (
              <VerbInput
                id={`v${index + 13}`}
                className={`col-start-4 col-span1 row-start-${index + 2}`}
                verb={verb}
                register={register}
                errors={errors}
                clearErrors={clearErrors}
                isSubmitted={isSubmitted}
              />
            );
          })}
        </div>
        <div className="flex gap-4 mt-10">
          <span className="font-semibold text-gray-800 flex items-center row-start-8 overflow-x-hidden">
            Gerund
          </span>
          <VerbInput
            id={"v19"}
            className={""}
            verb={verbData[verbIndex].gerund}
            register={register}
            errors={errors}
            clearErrors={clearErrors}
            isSubmitted={isSubmitted}
          />
        </div>

        {/* Submit button */}
        <div className="col-span-4 flex justify-center mt-6 gap-4">
          {isSubmitted ? (
            <>
              <button
                type="button"
                onClick={resetVerb}
                className="bg-red-500 text-white py-2 px-6 rounded-md shadow-lg hover:bg-red-600 transition duration-200">
                Restart
              </button>
            </>
          ) : (
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-6 rounded-md shadow-lg hover:bg-green-600 transition duration-200">
              Submit
            </button>
          )}
          <button
            type="button"
            onClick={handleNewVerb}
            className="bg-orange-500 text-white py-2 px-6 rounded-md shadow-lg hover:bg-orange-600 transition duration-200">
            New Random Verb
          </button>
        </div>
      </form>
    </>
  );
}

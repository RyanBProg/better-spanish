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
    formState: { errors },
  } = useForm();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [verbIndex, setVerbIndex] = useState(
    Math.floor(Math.random() * verbData.length)
  );

  const buildGame = () => {
    const state = {};
    ["present", "past", "future"].map(() => {});
  };

  const [gameState, setGameState] = useState({
    v1: { answer: "", correctAnswer: "" },
    v2: { answer: "", correctAnswer: "" },
    v3: { answer: "", correctAnswer: "" },
    v4: { answer: "", correctAnswer: "" },
    v5: { answer: "", correctAnswer: "" },
    v6: { answer: "", correctAnswer: "" },
    v7: { answer: "", correctAnswer: "" },
    v8: { answer: "", correctAnswer: "" },
    v9: { answer: "", correctAnswer: "" },
    v10: { answer: "", correctAnswer: "" },
    v11: { answer: "", correctAnswer: "" },
    v12: { answer: "", correctAnswer: "" },
    v13: { answer: "", correctAnswer: "" },
    v14: { answer: "", correctAnswer: "" },
    v15: { answer: "", correctAnswer: "" },
    v16: { answer: "", correctAnswer: "" },
    v17: { answer: "", correctAnswer: "" },
    v18: { answer: "", correctAnswer: "" },
  });

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
          <VerbInput
            id={"v1"}
            verb={verbData[verbIndex].present[0]}
            register={register}
            errors={errors}
            isSubmitted={isSubmitted}
          />
          <VerbInput
            id={"v2"}
            verb={verbData[verbIndex].past[0]}
            register={register}
            errors={errors}
            isSubmitted={isSubmitted}
          />
          <VerbInput
            id={"v3"}
            verb={verbData[verbIndex].future[0]}
            register={register}
            errors={errors}
            isSubmitted={isSubmitted}
          />
          <VerbInput
            id={"v4"}
            verb={verbData[verbIndex].present[1]}
            register={register}
            errors={errors}
            isSubmitted={isSubmitted}
          />
          <VerbInput
            id={"v5"}
            verb={verbData[verbIndex].past[1]}
            register={register}
            errors={errors}
            isSubmitted={isSubmitted}
          />
          <VerbInput
            id={"v6"}
            verb={verbData[verbIndex].future[1]}
            register={register}
            errors={errors}
            isSubmitted={isSubmitted}
          />
          <VerbInput
            id={"v7"}
            verb={verbData[verbIndex].present[2]}
            register={register}
            errors={errors}
            isSubmitted={isSubmitted}
          />
          <VerbInput
            id={"v8"}
            verb={verbData[verbIndex].past[2]}
            register={register}
            errors={errors}
            isSubmitted={isSubmitted}
          />
          <VerbInput
            id={"v9"}
            verb={verbData[verbIndex].future[2]}
            register={register}
            errors={errors}
            isSubmitted={isSubmitted}
          />
          <VerbInput
            id={"v10"}
            verb={verbData[verbIndex].present[3]}
            register={register}
            errors={errors}
            isSubmitted={isSubmitted}
          />
          <VerbInput
            id={"v11"}
            verb={verbData[verbIndex].past[3]}
            register={register}
            errors={errors}
            isSubmitted={isSubmitted}
          />
          <VerbInput
            id={"v12"}
            verb={verbData[verbIndex].future[3]}
            register={register}
            errors={errors}
            isSubmitted={isSubmitted}
          />
          <VerbInput
            id={"v13"}
            verb={verbData[verbIndex].present[4]}
            register={register}
            errors={errors}
            isSubmitted={isSubmitted}
          />
          <VerbInput
            id={"v14"}
            verb={verbData[verbIndex].past[4]}
            register={register}
            errors={errors}
            isSubmitted={isSubmitted}
          />
          <VerbInput
            id={"v15"}
            verb={verbData[verbIndex].future[4]}
            register={register}
            errors={errors}
            isSubmitted={isSubmitted}
          />
          <VerbInput
            id={"v16"}
            verb={verbData[verbIndex].present[5]}
            register={register}
            errors={errors}
            isSubmitted={isSubmitted}
          />
          <VerbInput
            id={"v17"}
            verb={verbData[verbIndex].past[5]}
            register={register}
            errors={errors}
            isSubmitted={isSubmitted}
          />
          <VerbInput
            id={"v18"}
            verb={verbData[verbIndex].future[5]}
            register={register}
            errors={errors}
            isSubmitted={isSubmitted}
          />
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
            isSubmitted={isSubmitted}
          />
        </div>
        {/* Submit button */}
        <div className="col-span-4 flex justify-center mt-6 gap-4">
          {isSubmitted ? (
            <>
              <button
                type="button"
                onClick={handleNewVerb}
                className="bg-orange-500 text-white py-2 px-6 rounded-md shadow-lg hover:bg-orange-600 transition duration-200">
                New Verb
              </button>
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
        </div>
      </form>
    </>
  );
}

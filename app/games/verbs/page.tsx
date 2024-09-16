"use client";

import { useForm } from "react-hook-form";
import verbData from "../../data/verbs.json";
import { useState } from "react";
import GameControls from "./_components/GameControls";
import Confetti from "react-confetti";
import useWindowSize from "@/app/utils/useWindowSize";
import Heading from "./_components/Heading";
import VerbForm from "./_components/VerbForm";

export default function Home() {
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { width, height } = useWindowSize();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    setIsSubmitted(true);
  });

  const getNewRandomVerb = () => {
    setVerbIndex(Math.floor(Math.random() * verbData.length));
    setShowAnswers(false);
    reset();
    setIsSubmitted(false);
  };

  const handleVerbChange = (verb: string) => {
    setShowAnswers(false);
    reset();
    setIsSubmitted(false);
    setVerbIndex(verbData.findIndex((item) => item.spanish === verb));
  };

  return (
    <>
      <div className="flex flex-col h-full relative">
        <div className="overflow-y-scroll flex-1">
          <Heading
            espWord={verbData[verbIndex].spanish}
            engWord={verbData[verbIndex].english}
          />
          <VerbForm
            onSubmit={onSubmit}
            verb={verbData[verbIndex]}
            register={register}
            errors={errors}
            clearErrors={clearErrors}
            showAnswers={showAnswers}
          />
        </div>

        {isSubmitted && (
          <div className="bg-orange-100/75 text-center rounded-lg backdrop-blur-sm drop-shadow-lg w-max px-5 sm:px-10 py-10 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
            <h2 className="font-bold text-4xl">Good Job!!!</h2>
            <p>You answered everything correctly</p>
            <button
              onClick={getNewRandomVerb}
              className="bg-orange-500 w-full mt-4 text-white py-2 rounded-md hover:brightness-150 transition-[filter] duration-200">
              New Random Verb
            </button>
          </div>
        )}

        {isSubmitted && <Confetti width={width} height={height} />}

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

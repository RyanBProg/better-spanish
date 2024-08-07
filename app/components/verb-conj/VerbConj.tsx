"use client";

import { useState } from "react";
import verbData from "../../data/verbs.json";
import VerbInputCard from "./VerbInputCard";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";

export type TFormInput = {
  [key: string]: string;
};

const classIterable = [
  "md:pr-6 md:pb-6 md:pt-0 md:border-r-2 border-b-2",
  "md:pl-6 md:pb-6 md:pt-0 border-b-2",
  "md:pr-6 md:border-r-2 border-b-2",
  "md:pl-6 border-b-2",
  "md:pr-6 md:pt-6 md:border-r-2 border-b-2 md:border-b-0",
  "md:pl-6 md:pt-6",
];

export default function VerbConj() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TFormInput>();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [randomIndex, setRandomIndex] = useState(
    Math.floor(Math.random() * verbData.length)
  );
  const verb = verbData[randomIndex];

  const onSubmit: SubmitHandler<TFormInput> = (data) => {
    console.log(data);
    setIsSubmitted(true);
  };

  const onError = (errors: FieldValues) => {
    console.log("Errors:", errors);
  };

  return (
    <div>
      <form
        className="mx-auto max-w-[1100px]"
        onSubmit={handleSubmit(onSubmit, onError)}>
        <h1 className="font-semibold">Verb Conjugations</h1>
        <p className="mb-10">
          Answer all 6 verb conjugations correctly to move onto the next verb.
        </p>
        <h2 className="text-4xl font-semibold capitalize">
          {verb.spanish}
          <span className="text-base ml-2"> - {verb.english}</span>
        </h2>
        <p className="text-base text-orange-500 mb-6 md:mb-10">
          (present tense)
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 mb-10">
          {verb.present.map((verb, index) => (
            <VerbInputCard
              key={index}
              classes={classIterable[index]}
              verb={verb}
              register={register}
              errors={errors}
              isSubmitted={isSubmitted}
            />
          ))}
        </div>
        <h2 className="text-4xl font-semibold capitalize">
          {verb.spanish}
          <span className="text-base ml-2"> - {verb.english}</span>
        </h2>
        <p className="text-base text-orange-500 mb-6 md:mb-10">(past tense)</p>
        <div className="grid grid-cols-1 md:grid-cols-2 mb-10">
          {verb.past.map((verb, index) => (
            <VerbInputCard
              key={index}
              classes={classIterable[index]}
              verb={verb}
              register={register}
              errors={errors}
              isSubmitted={isSubmitted}
            />
          ))}
        </div>
        <h2 className="text-4xl font-semibold capitalize">
          {verb.spanish}
          <span className="text-base ml-2"> - {verb.english}</span>
        </h2>
        <p className="text-base text-orange-500 mb-6 md:mb-10">(gerund)</p>
        <VerbInputCard
          classes="md:pr-6 md:pb-6 md:pt-0"
          verb={verb.gerund}
          register={register}
          errors={errors}
          isSubmitted={isSubmitted}
        />
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-green-400 text-white text-lg px-3 rounded-md drop-shadow-md hover:brightness-110">
            Submit
          </button>
          <button
            type="button"
            onClick={() =>
              setRandomIndex(Math.floor(Math.random() * verbData.length))
            }
            className="bg-orange-400 text-white text-lg px-3 rounded-md drop-shadow-md hover:brightness-110">
            New Verb
          </button>
        </div>
      </form>
    </div>
  );
}

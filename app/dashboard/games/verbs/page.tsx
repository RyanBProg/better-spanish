"use server";

import VerbGame from "@/components/verb-game/VerbGame";
import { getVerbs, getVerbConjugations } from "@/app/actions/verbs";

export default async function Home() {
  const verbList = await getVerbs();
  if (!verbList.data) {
    console.error(verbList.error || "An unexpected error occurred");
    return (
      <VerbGame error={verbList.error || "An unexpected error occurred"} />
    );
  }

  const verbConjugation = await getVerbConjugations(verbList.data[0].id);
  if (!verbConjugation.data) {
    console.error(verbConjugation.error || "An unexpected error occurred");
    return (
      <VerbGame
        error={verbConjugation.error || "An unexpected error occurred"}
      />
    );
  }

  const baseVerb =
    verbList.data.find((verb) => verb.id === verbConjugation.data?.verbId) ||
    verbList.data[0];

  return (
    <>
      <div className="width-container my-20">
        <div className="width-inner flex flex-col h-full relative">
          <h1 className="mb-2 font-bold text-4xl">Verb Conjugations</h1>
          <p className="mb-20">
            Answer all 6 verb conjugations for all 3 tenses correctly to move
            onto the next verb.
          </p>
          <VerbGame
            verbList={verbList.data}
            initialBaseVerb={baseVerb}
            initialVerbConj={verbConjugation.data}
          />
        </div>
      </div>
    </>
  );
}

"use server";

import VerbGame from "@/components/verb-game/VerbGame";
import { getVerbs, getVerbConjugations } from "@/app/actions/verbs";

export default async function Home() {
  const verbList = await getVerbs();
  const verbConjugation = await getVerbConjugations(verbList[0].id);
  const baseVerb =
    verbList.find((verb) => verb.id === verbConjugation.verbId) || verbList[0];

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
            verbList={verbList}
            initialBaseVerb={baseVerb}
            initialVerbConj={verbConjugation}
          />
        </div>
      </div>
    </>
  );
}

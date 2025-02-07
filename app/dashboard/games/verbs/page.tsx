export const dynamic = "force-dynamic";

import VerbGame from "@/components/verb-game/VerbGame";
import { getVerbs, getVerbConjugations } from "@/app/actions/verbs";
import GameHeading from "@/components/common/GameHeading";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function page() {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  !isUserAuthenticated && redirect("/api/auth/login");

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
      <div className="width-container my-10 sm:my-20">
        <div className="width-inner flex flex-col h-full relative">
          <GameHeading
            title="Verb Conjugations"
            tip="Answer all 6 verb conjugations for all 3 tenses correctly to move
            onto the next verb"
          />

          {/* spacer */}
          <div className="h-28"></div>
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

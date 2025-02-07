"use server";

import { getQuestions } from "@/app/actions/multi-choice-game";
import GameHeading from "@/components/common/GameHeading";
import MultiChoiceGame from "@/components/multi-choice-game/MultiChoiceGame";

export default async function page() {
  const questionData = await getQuestions();
  if (!questionData.data) {
    console.error(questionData.error || "An unexpected error occurred");
    return (
      <MultiChoiceGame
        error={questionData.error || "An unexpected error occurred"}
      />
    );
  }

  return (
    <>
      <div className="width-container my-10 sm:my-20">
        <div className="width-inner flex flex-col h-full">
          <GameHeading
            title="Multiple Choice"
            tip="Choose the correct English translation for each Spanish word. A great way to test your vocabulary recognition and improve word recall"
          />

          <MultiChoiceGame questionData={questionData.data} />
        </div>
      </div>
    </>
  );
}

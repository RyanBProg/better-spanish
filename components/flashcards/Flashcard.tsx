import { Brain } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import LoadingSpinner from "../common/LoadingSpinner";
import { Word } from "@/lib/types";

type Props = {
  isUpdating: boolean;
  isFlipped: boolean;
  setIsFlipped: Dispatch<SetStateAction<boolean>>;
  deckIndex: number;
  flashcardDeck: Word[];
};

export default function Flashcard({
  isUpdating,
  isFlipped,
  setIsFlipped,
  deckIndex,
  flashcardDeck,
}: Props) {
  return (
    <div className="mx-auto h-[230px] w-[300px] sm:h-[300px] sm:w-[400px] z-10 perspective-[1000px]">
      <div
        className={`relative w-full h-full container__flashcard ${
          isFlipped ? "container__flashcard--flipped" : ""
        }`}>
        {/* Front card */}
        <div className="flashcard overflow-clip">
          {isUpdating ? (
            <LoadingSpinner size="sm" />
          ) : (
            <span className="font-medium text-3xl capitalize border-b">
              {flashcardDeck[deckIndex].spanish}
            </span>
          )}
          <Button
            className="absolute mx-auto bottom-3"
            variant="outline"
            disabled={isUpdating}
            tabIndex={!isFlipped ? 0 : -1}
            onClick={() => setIsFlipped((prev) => !prev)}>
            Flip
          </Button>
          <div className="absolute top-1 right-2">
            <Image
              src="/icons/spain-flag-96x96.png"
              height={38}
              width={38}
              alt="spain flag"
            />
          </div>
          <Brain
            size={300}
            strokeWidth={0.75}
            color="#fff3eb"
            className="absolute -z-10 -bottom-20 sm:-bottom-10 -left-[80px]"
          />
        </div>

        {/* Back card */}
        <div className="flashcard flashcard--back">
          {isUpdating ? (
            <LoadingSpinner size="sm" />
          ) : (
            <span className="font-medium text-3xl capitalize border-b">
              {flashcardDeck[deckIndex].english}
              <hr />
            </span>
          )}
          <Button
            className="absolute mx-auto bottom-3"
            variant="outline"
            disabled={isUpdating}
            tabIndex={isFlipped ? 0 : -1}
            onClick={() => setIsFlipped((prev) => !prev)}>
            Flip
          </Button>
          <div className="absolute top-0 right-2">
            <Image
              src="/icons/england-flag-96x96.png"
              height={38}
              width={38}
              alt="england flag"
            />
          </div>
          <Brain
            size={300}
            strokeWidth={0.75}
            color="#fff3eb"
            className="absolute -z-10 -bottom-20 sm:-bottom-10 -left-[80px]"
          />
        </div>
      </div>
    </div>
  );
}

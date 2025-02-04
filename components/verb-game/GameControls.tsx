import { BaseVerb } from "@/lib/types";
import { Dispatch, SetStateAction } from "react";
import { GameState } from "./VerbGame";

type Props = {
  gameState: GameState;
  setGameState: Dispatch<SetStateAction<GameState>>;
  getNewRandomVerb: () => void;
  verbList: BaseVerb[];
  handleVerbChange: (verbId: number) => Promise<void>;
};

export default function GameControls({
  gameState,
  setGameState,
  getNewRandomVerb,
  verbList,
  handleVerbChange,
}: Props) {
  return (
    <div className="bg-white grid grid-cols-2 grid-rows-2 md:grid-cols-3 md:grid-rows-1 gap-2">
      <select
        value={gameState.baseVerb.id}
        onChange={(e) => handleVerbChange(parseInt(e.currentTarget.value))}
        className="col-span-2 md:col-span-1 rounded-md w-full shadow-sm p-2 border capitalize">
        {verbList.map((verb) => (
          <option key={verb.id} value={verb.id}>
            {verb.spanish}
          </option>
        ))}
      </select>
      <button
        onClick={() =>
          setGameState((prev) => ({ ...prev, showAnswers: !prev.showAnswers }))
        }
        className="bg-neutral-700 w-full text-white py-2 rounded-md hover:brightness-150 transition-[filter] duration-200">
        {gameState.showAnswers ? "Hide Answers" : "Show Answers"}
      </button>
      <button
        type="button"
        onClick={getNewRandomVerb}
        className="bg-neutral-700 w-full text-white py-2 rounded-md hover:brightness-150 transition-[filter] duration-200">
        Random Verb
      </button>
    </div>
  );
}

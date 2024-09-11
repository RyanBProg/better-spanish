import { Dispatch, SetStateAction } from "react";

type Props = {
  setShowAnswers: Dispatch<SetStateAction<boolean>>;
  showAnswers: boolean;
  getNewRandomVerb: () => void;
  verbList: string[];
  currentVerb: string;
  handleVerbChange: (e: string) => void;
};

export default function GameControls({
  setShowAnswers,
  showAnswers,
  getNewRandomVerb,
  verbList,
  currentVerb,
  handleVerbChange,
}: Props) {
  return (
    <div className="bg-white grid grid-cols-2 grid-rows-2 md:grid-cols-3 md:grid-rows-1 gap-2 pt-2 sm:pt-3 md:pt-4 border-t-2">
      <select
        value={currentVerb}
        onChange={(e) => handleVerbChange(e.currentTarget.value)}
        className="col-span-2 md:col-span-1 rounded-md w-full shadow-sm p-2 border capitalize">
        {verbList.map((verb) => (
          <option key={verb} value={verb}>
            {verb}
          </option>
        ))}
      </select>
      <button
        onClick={() => setShowAnswers((prev) => !prev)}
        className="bg-neutral-700 w-full text-white py-2 rounded-md hover:brightness-150 transition-[filter] duration-200">
        {showAnswers ? "Hide Answers" : "Show Answers"}
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

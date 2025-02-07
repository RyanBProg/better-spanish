import { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { MultiChoiceUserAnswer } from "@/lib/types";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

type Props = {
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  answers: MultiChoiceUserAnswer[];
  handleNewDeck: () => void;
};

export default function GameReviewDialog({
  dialogOpen,
  setDialogOpen,
  answers,
  handleNewDeck,
}: Props) {
  const router = useRouter();

  const getRatingColor = (isCorrect: boolean) => {
    switch (isCorrect) {
      case true:
        return "text-green-500";
      case false:
        return "text-red-500";
      default:
        return "";
    }
  };

  const correctQty = answers.filter((answer) => answer.isCorrect).length;

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>You Scored: {correctQty} out of 20! 🎉</DialogTitle>
          <DialogDescription>Review your results:</DialogDescription>
        </DialogHeader>

        <div className="max-h-[400px] overflow-y-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-white">
              <tr className="border-b">
                <th className="text-left p-2">Spanish</th>
                <th className="text-left p-2">English</th>
                <th className="text-left p-2">Result</th>
              </tr>
            </thead>
            <tbody>
              {answers.map((answer, i) => (
                <tr key={i} className="border-b">
                  <td className="p-2">{answer.word.spanish}</td>
                  <td className="p-2">{answer.word.english}</td>
                  <td className={`p-2 ${getRatingColor(answer.isCorrect)}`}>
                    {answer.userAnswer}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-4 mt-4">
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            Finish
          </Button>
          <Button onClick={handleNewDeck}>New Deck</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

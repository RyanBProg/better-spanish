import { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { UserFlashcardAnswer } from "@/lib/types";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

type Props = {
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  answers: UserFlashcardAnswer[];
  handleNewDeck: () => void;
};

export default function GameReviewDialog({
  dialogOpen,
  setDialogOpen,
  answers,
  handleNewDeck,
}: Props) {
  const router = useRouter();

  const getRatingColor = (rating: number) => {
    switch (rating) {
      case 4:
        return "text-green-500";
      case 3:
        return "text-yellow-500";
      case 2:
        return "text-orange-500";
      case 1:
        return "text-red-500";
      default:
        return "";
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Deck Complete! 🎉</DialogTitle>
          <DialogDescription>Review your progress:</DialogDescription>
        </DialogHeader>

        <div className="max-h-[400px] overflow-y-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-white">
              <tr className="border-b">
                <th className="text-left p-2">Spanish</th>
                <th className="text-left p-2">English</th>
                <th className="text-left p-2">Rating</th>
              </tr>
            </thead>
            <tbody>
              {answers.map((answer, i) => (
                <tr key={i} className="border-b">
                  <td className="p-2">{answer.word}</td>
                  <td className="p-2">{answer.translation}</td>
                  <td className={`p-2 ${getRatingColor(answer.rating)}`}>
                    {answer.rating === 4
                      ? "Easy"
                      : answer.rating === 3
                      ? "Good"
                      : answer.rating === 2
                      ? "Hard"
                      : "No Idea"}
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

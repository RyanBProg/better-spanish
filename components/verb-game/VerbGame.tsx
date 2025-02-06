"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import GameControls from "./GameControls";
import VerbForm from "./VerbForm";
import { getVerbConjugations } from "@/app/actions/verbs";
import { BaseVerb, VerbConjugation } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Props = {
  error?: string;
  verbList?: BaseVerb[];
  initialBaseVerb?: BaseVerb;
  initialVerbConj?: VerbConjugation;
};

export type GameState = {
  baseVerb: BaseVerb | undefined;
  conjugations: VerbConjugation | undefined;
  isLoading: boolean;
  showAnswers: boolean;
  gameStatus: "playing" | "submitted";
};

export default function VerbGame({
  error,
  verbList,
  initialBaseVerb,
  initialVerbConj,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const [gameState, setGameState] = useState<GameState>({
    baseVerb: initialBaseVerb,
    conjugations: initialVerbConj,
    isLoading: false,
    showAnswers: false,
    gameStatus: "playing",
  });

  if (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: error,
    });
    return null;
  }

  if (!verbList || !gameState.baseVerb || !gameState.conjugations) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "An unexpected error occurred",
    });
    return null;
  }

  const router = useRouter();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    setGameState((prev) => ({
      ...prev,
      gameStatus: "submitted",
    }));
  });

  const getNewRandomVerb = async () => {
    setGameState((prev) => ({ ...prev, isLoading: true }));
    const randomIndex = Math.floor(Math.random() * verbList.length);
    const verbConjugation = await getVerbConjugations(verbList[randomIndex].id);

    if (!verbConjugation.data) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred",
      });
      return null;
    }

    setGameState({
      baseVerb: verbList[randomIndex],
      conjugations: verbConjugation.data,
      isLoading: false,
      showAnswers: false,
      gameStatus: "playing",
    });

    reset();
  };

  const handleVerbChange = async (verbId: number) => {
    setGameState((prev) => ({ ...prev, isLoading: true }));

    const verbConjugation = await getVerbConjugations(verbId);
    const baseVerb = verbList.find((verb) => verb.id === verbId);
    if (!baseVerb) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
      return;
    }

    setGameState({
      baseVerb,
      conjugations: verbConjugation.data,
      isLoading: false,
      showAnswers: false,
      gameStatus: "playing",
    });

    reset();
  };

  return (
    <>
      <div className="overflow-y-scroll flex-1 max-w-screen-lg">
        <h2 className="text-3xl font-semibold capitalize mb-10">
          {gameState.baseVerb.spanish}
          <span className="text-base ml-2">
            {" "}
            - {gameState.baseVerb.english}
          </span>
        </h2>
        <VerbForm
          onSubmit={onSubmit}
          verb={gameState.conjugations}
          register={register}
          errors={errors}
          clearErrors={clearErrors}
          showAnswers={gameState.showAnswers}
        />
      </div>
      <Dialog
        open={gameState.gameStatus === "submitted"}
        onOpenChange={() =>
          setGameState((prev) => ({ ...prev, gameStatus: "playing" }))
        }>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Deck Complete! 🎉</DialogTitle>
            <DialogDescription>Review your progress:</DialogDescription>
          </DialogHeader>

          <div className="flex justify-end gap-4 mt-4">
            <Button variant="outline" onClick={() => router.push("/dashboard")}>
              Finish
            </Button>
            <Button onClick={getNewRandomVerb}>New Verb</Button>
          </div>
        </DialogContent>
      </Dialog>
      <GameControls
        gameState={gameState}
        setGameState={setGameState}
        getNewRandomVerb={getNewRandomVerb}
        verbList={verbList}
        handleVerbChange={handleVerbChange}
      />
      <Toaster />
    </>
  );
}

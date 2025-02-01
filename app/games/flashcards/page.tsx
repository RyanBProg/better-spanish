"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";

const MOCK_DATA = [
  {
    eng: "hello",
    span: "hola",
  },
  {
    eng: "gato",
    span: "cat",
  },
  {
    eng: "hello",
    span: "uno",
  },
  {
    eng: "to be",
    span: "ser",
  },
];

export default function page() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="my-20">
      <h1 className="text-center mb-10 font-bold text-4xl">Flashcards</h1>
      <Card className="mx-auto h-[450px] w-[350px] p-4 flex flex-col gap-10 items-center">
        {!isFlipped && (
          <span className="mt-20 text-2xl capitalize">{MOCK_DATA[0].span}</span>
        )}
        {isFlipped && (
          <span className="mt-20 text-2xl capitalize">{MOCK_DATA[0].eng}</span>
        )}
        <Button
          className="mt-auto"
          variant="outline"
          onClick={() => setIsFlipped((prev) => !prev)}>
          Flip
        </Button>
        <div className="flex justify-center gap-4">
          <Button
            className="bg-green-500 hover:bg-green-600"
            onClick={() => setIsFlipped((prev) => !prev)}>
            Easy
          </Button>
          <Button
            className="bg-yellow-500 hover:bg-yellow-600"
            onClick={() => setIsFlipped((prev) => !prev)}>
            Medium
          </Button>
          <Button
            className="bg-red-500 hover:bg-red-600"
            onClick={() => setIsFlipped((prev) => !prev)}>
            Hard
          </Button>
        </div>
      </Card>
    </div>
  );
}

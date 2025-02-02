import React from "react";
import { Card } from "../ui/card";
import LoadingSpinner from "../common/LoadingSpinner";

export default function LoadingCard() {
  return (
    <Card className="mx-auto h-[450px] w-[350px] flex justify-center items-center">
      <LoadingSpinner size="lg" />
    </Card>
  );
}

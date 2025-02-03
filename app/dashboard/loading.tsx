import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Brain } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="mt-20 sm:mt-44 flex justify-center items-center">
      <LoadingSpinner size="lg" />
    </div>
  );
}

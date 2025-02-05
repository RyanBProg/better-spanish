"use server";

import GameHeading from "@/components/common/GameHeading";
import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <>
      <div className="width-container my-10 sm:my-20">
        <div className="width-inner flex flex-col h-full">
          <GameHeading title="Multiple Choice" tip="top tip" />

          {/* card */}
          <div className="relative mx-auto flex flex-col items-center gap-20 py-28">
            <div className="mx-auto">
              <span className="relative text-2xl">
                10
                <span className="absolute -bottom-1 right-0 translate-x-full text-sm font-light">
                  /10
                </span>
              </span>
            </div>
            <span className="mx-auto text-center font-medium text-7xl capitalize border-b">
              {"Abril"}
            </span>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" className="text-lg p-5">
                April
              </Button>
              <Button variant="outline" className="text-lg p-5">
                June
              </Button>
              <Button variant="outline" className="text-lg p-5">
                December
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

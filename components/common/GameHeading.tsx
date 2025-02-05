import { ArrowLeft, Info } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type Props = {
  title: string;
  tip: string;
};

export default function GameHeading({ title, tip }: Props) {
  return (
    <div className="flex justify-between items-center">
      <Link href="/dashboard" className="flex gap-1 sm:gap-2 items-center">
        <ArrowLeft size={20} />
        <span className="text-base">Quit</span>
      </Link>
      <div className="flex gap-2 sm:gap-4 items-center">
        <h1 className="font-bold text-xl sm:text-3xl capitalize">{title}</h1>
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger>
              <Info size={20} />
            </TooltipTrigger>
            <TooltipContent
              className="max-w-[280px] text-sm whitespace-normal"
              avoidCollisions={true}
              side="bottom"
              sideOffset={10}
              align="end">
              <p className="first-letter:capitalize">{tip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

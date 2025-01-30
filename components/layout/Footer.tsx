import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="width-container bg-black py-5 mt-auto">
      <div className="width-inner flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-neutral-200">
          Copyright © {new Date().getFullYear()} - All Rights Reserved
        </p>
        <nav className="flex md:justify-self-end">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "link" }),
              "text-neutral-200"
            )}>
            Home
          </Link>
          <div>
            <Separator orientation="vertical" />
          </div>
          <Link
            href="/policy"
            className={cn(
              buttonVariants({ variant: "link" }),
              "text-neutral-200"
            )}>
            Our Policies
          </Link>
        </nav>
      </div>
    </footer>
  );
}

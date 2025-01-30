import { Brain } from "lucide-react";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function LandingHeader() {
  return (
    <header className="width-container">
      <nav className="width-inner py-2 border-b flex justify-between items-center">
        <Link href="/" aria-label="navigate home">
          <Brain size={44} strokeWidth={0.75} />
        </Link>
        <ul className="flex gap-4">
          <li>
            <LoginLink className={buttonVariants()}>Log In</LoginLink>
          </li>
          <li>
            <RegisterLink className={buttonVariants({ variant: "outline" })}>
              Sign Up
            </RegisterLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

"use client";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Brain, House, LogOut, UserRound } from "lucide-react";
import Link from "next/link";

export default function DashboardNav() {
  return (
    <header className="width-container">
      <nav className="width-inner py-2 border-b flex justify-between items-center">
        <Link href="/" aria-label="navigate home">
          <Brain size={44} strokeWidth={0.75} />
        </Link>
        <ul className="flex items-center gap-5">
          <li className="relative group">
            <Link
              href="/dashboard"
              className="bg-white/50 shadow border backdrop-blur-sm flex p-[6px] rounded-full">
              <House size={28} strokeWidth={1} className="block" />
            </Link>
            <span className="absolute hidden group-hover:block left-1/2 -translate-x-1/2 -bottom-12 bg-white px-2 rounded-lg drop-shadow">
              Dashboard
            </span>
          </li>
          <li className="relative group">
            <Link
              href="/dashboard/account"
              className="bg-white/50 shadow border backdrop-blur-sm flex p-[6px] rounded-full">
              <UserRound size={28} strokeWidth={1} className="block" />
            </Link>
            <span className="absolute hidden group-hover:block left-1/2 -translate-x-1/2 -bottom-12 bg-white px-2 rounded-lg drop-shadow">
              Account
            </span>
          </li>
          {/* Separator */}
          <div className="h-[30px] w-[2px] bg-neutral-300"></div>
          <li className="relative group">
            <LogoutLink className="bg-white/50 shadow border backdrop-blur-sm flex p-[6px] rounded-full">
              <LogOut size={28} strokeWidth={1} className="block" />
            </LogoutLink>
            <span className="absolute hidden group-hover:block left-1/2 -translate-x-1/2 -bottom-12 bg-white px-2 rounded-lg drop-shadow">
              Logout
            </span>
          </li>
        </ul>
      </nav>
    </header>
  );
}

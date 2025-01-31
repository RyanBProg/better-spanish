"use client";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { ArrowUp, Brain, House, LogOut, UserRound } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export default function DashboardNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    const handleEscKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKeyPress);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [isMenuOpen]);

  return (
    <div
      ref={menuRef}
      className={`fixed mx-auto inset-x-0 w-fit z-50 bottom-0 translate-y-full transition-transform  ${
        isMenuOpen && "-translate-y-3"
      }`}>
      <div className="p-1 bg-white border rounded-full flex justify-center items-center gap-4">
        <button
          ref={menuButtonRef}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="absolute -top-12 bg-white flex items-center gap-4 border border-b-0 rounded-t-2xl px-4 py-1 hover:cursor-pointer">
          <ArrowUp
            size={24}
            color="#fdceaf"
            className={`transition-transform ${isMenuOpen && "rotate-180"}`}
            strokeWidth={2}
          />
          <span>Menu</span>
        </button>

        <div className="rounded-full p-3 -mr-3">
          <Brain size={32} strokeWidth={1} />
        </div>

        {/* Separator */}
        <div className="h-[30px] w-[2px] bg-neutral-300"></div>

        <Link
          href="/dashboard"
          className="relative group p-3 rounded-full bg-[#fdceaf]">
          <House size={32} strokeWidth={1} />
          <span className="absolute hidden group-hover:block left-1/2 -translate-x-1/2 -top-10 bg-white px-2 rounded-lg drop-shadow">
            Home
          </span>
        </Link>

        <Link
          href="/dashboard/account"
          className="relative group p-3 rounded-full bg-[#fdceaf]">
          <UserRound size={32} strokeWidth={1} />
          <span className="absolute hidden group-hover:block left-1/2 -translate-x-1/2 -top-10 bg-white px-2 rounded-lg drop-shadow">
            Account
          </span>
        </Link>

        {/* Separator */}
        <div className="h-[30px] w-[2px] bg-neutral-300"></div>

        <LogoutLink className="relative group p-3 rounded-full bg-[#fdceaf]">
          <LogOut size={32} strokeWidth={1} />
          <span className="absolute hidden group-hover:block min-w-fit left-1/2 -translate-x-1/2 -top-10 bg-white px-2 rounded-lg drop-shadow">
            Logout
          </span>
        </LogoutLink>
      </div>
    </div>
  );
}

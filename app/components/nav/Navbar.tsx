import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="flex justify-between items-center">
      <p className="font-bold text-2xl pl-6 py-2">
        <span className="text-orange-400 block -mb-3">
          <span className="text-4xl">B</span>etter
        </span>
        <span className="text-4xl">S</span>panish
      </p>
      <nav className="pr-6">
        <ul className="flex gap-10">
          <li>
            <Link href={"/"} className="hover:opacity-60">
              Keywords
            </Link>
          </li>
          <li>
            <Link href={"/"} className="hover:opacity-60">
              Dates
            </Link>
          </li>
          <li>
            <Link href={"/"} className="hover:opacity-60">
              Numbers
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

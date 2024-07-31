"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import menuIcon from "../../../public/images/icons/icon-hamburger.svg";
import closeIcon from "../../../public/images/icons/icon-close.svg";
import facebookIcon from "../../../public/images/icons/icon-facebook.svg";
import twitterIcon from "../../../public/images/icons/icon-twitter.svg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="z-10 relative flex justify-between py-4 px-4 drop-shadow-lg sm:items-center">
      <Link href={"/"}>
        <p className="font-bold text-2xl">
          <span className="text-orange-400 block -mb-3">
            <span className="text-4xl">B</span>etter
          </span>
          <span className="text-4xl">S</span>panish
        </p>
      </Link>
      <button className="z-10 sm:hidden">
        {menuOpen ? (
          <Image
            src={closeIcon}
            alt="close menu icon"
            onClick={() => {
              setMenuOpen(false);
            }}
          />
        ) : (
          <Image
            src={menuIcon}
            alt="mobile menu icon"
            onClick={() => {
              setMenuOpen(true);
            }}
          />
        )}
      </button>
      <nav
        className={`${
          !menuOpen && "hidden"
        } absolute w-full h-screen bg-orange-400 left-0 top-0 pt-10 sm:block sm:relative sm:bg-transparent sm:w-fit sm:h-fit sm:pt-0`}>
        <ul className="flex flex-col items-center text-grey-700 w-full px-6 text-2xl font-light text-white sm:text-gray-800 sm:flex-row sm:text-base sm:font-normal sm:gap-6 md:gap-10 sm:px-0">
          <li className=" w-full font-medium text-center py-4 sm:border-none sm:py-0 hover:opacity-60">
            <Link href={"/learning"}>Learning</Link>
          </li>
          <li className="border-t-[1px] border-orange-300 w-full font-medium text-center py-4 sm:border-none sm:py-0 hover:opacity-60">
            <Link href={"/keywords"}>Keywords</Link>
          </li>
          <li className="border-t-[1px] border-orange-300 w-full font-medium text-center py-4 sm:border-none sm:py-0 hover:opacity-60">
            <Link href={"/numbers"}>Numbers</Link>
          </li>
          <li className="border-t-[1px] border-orange-300 w-full font-medium text-center py-4 sm:border-none sm:py-0 hover:opacity-60">
            <Link href={"/date-time"}>Date/Time</Link>
          </li>
          <li className="border-t-[1px] border-orange-300 w-full font-medium text-center py-4 sm:border-none sm:py-0 hover:opacity-60">
            <Link href={"/verbs"}>Verbs</Link>
          </li>
          <li className="w-full text-center py-4 mt-2 sm:mt-0 sm:py-0">
            <button className="bg-white sm:bg-orange-400 rounded-md drop-shadow-lg w-full py-2 font-medium text-gray-800 sm:text-white sm:shadow-sm sm:px-6 sm:py-1 hover:brightness-110">
              Login
            </button>
          </li>
          <div className="absolute bottom-14 mx-auto sm:hidden">
            <button className="mr-14">
              <Image src={facebookIcon} alt="facebook icon" />
            </button>
            <button>
              <Image src={twitterIcon} alt="twitter icon" />
            </button>
          </div>
        </ul>
      </nav>
    </header>
  );
}

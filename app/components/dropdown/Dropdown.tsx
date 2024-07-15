"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import arrowIcon from "../../../public/images/icon-arrow.svg";

type Props = {
  image: StaticImageData;
  title: string;
};

export default function Dropdown({ image, title }: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div>
      <div className="flex gap-10">
        <h3 className="text-xl font-semibold">{title}</h3>
        <button onClick={() => setDropdownOpen((prev) => !prev)}>
          <Image
            src={arrowIcon}
            alt="arrow icon"
            width={20}
            height={20}
            className={`${dropdownOpen && "rotate-180"}`}
          />
        </button>
      </div>
      {dropdownOpen && (
        <Image src={image} alt="spanish colors cheat sheet" className="mt-4" />
      )}
      <hr className="w-full h-[3px] bg-orange-200 my-3" />
    </div>
  );
}

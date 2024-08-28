import Image from "next/image";
import Link from "next/link";
import homeIcon from "../../../public/icons/home.svg";
import bookIcon from "../../../public/icons/book.svg";
import boltIcon from "../../../public/icons/bolt.svg";
import joystickIcon from "../../../public/icons/joystick.svg";
import accountIcon from "../../../public/icons/user.svg";

export default function Navbar() {
  return (
    <div className="z-50 bg-white md:h-full pt-2 sm:pt-3 md:pt-0 md:pr-4 md:top-0 md:right-auto">
      <div className="bg-red-200 rounded-xl p-2 sm:p-3 flex justify-between md:flex-col md:h-full">
        <div className="size-12 p-3">
          <Image
            src={boltIcon}
            alt=""
            className="block size-full object-cover"
          />
        </div>
        <div className="flex gap-2 sm:gap-4 md:flex-col">
          <NavButton name="Home" alt="" href="/" icon={homeIcon} />
          <NavButton name="Learning" alt="" href="/learning" icon={bookIcon} />
          <NavButton name="Games" alt="" href="/games" icon={joystickIcon} />
        </div>
        <NavButton
          name="Account"
          alt=""
          href="/my-account"
          icon={accountIcon}
        />
      </div>
    </div>
  );
}

type ButtonProps = {
  name: string;
  icon: any;
  alt: string;
  href: string;
};

export function NavButton({ name, icon, alt, href }: ButtonProps) {
  return (
    <div className="relative group">
      <Link href={href}>
        <div className="size-12 drop-shadow-sm p-3 rounded-full bg-white/60 transition-colors hover:bg-white">
          <Image src={icon} alt={alt} />
        </div>
      </Link>
      <span className="absolute hidden group-hover:block -top-14 md:top-1/2 md:-translate-y-1/2 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-20 bg-white px-2 rounded-lg drop-shadow-lg">
        {name}
      </span>
    </div>
  );
}

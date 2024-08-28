import Link from "next/link";
import Image from "next/image";
import boltIcon from "../public/icons/bolt.svg";

export default function Home() {
  return (
    <>
      <span className="flex gap-4 items-center mt-10">
        <Image src={boltIcon} alt="" className="size-40" />
        <h1 className="text-3xl font-semibold max-w-[600px]">
          Reach Fluency Faster by Mastering High-Frequency Words
        </h1>
      </span>

      {/* games container */}

      <div className="mt-32">
        <div className="flex gap-6 items-center">
          <h2 className="text-2xl font-semibold">Games</h2>
          <Link href="/games" className="underline text-sm">
            See All
          </Link>
        </div>
        <hr className="w-full h-[2px] bg-orange-200 mt-2 mb-4" />
        <div className="flex gap-4">
          <Link href={"/keywords"}>
            <button className="bg-orange-200 py-6 px-4 text-left rounded-md max-w-[200px] drop-shadow-sm transition-transform hover:scale-[1.02]">
              <h3 className="font-semibold text-xl mb-6">Keywords</h3>
              <p className="text-gray-500">
                Helpful keywords for everyday speaking
              </p>
            </button>
          </Link>
          <Link href={"/date-time"}>
            <button className="bg-orange-100 py-6 px-4 text-left rounded-md max-w-[200px] drop-shadow-sm transition-transform hover:scale-[1.02]">
              <h3 className="font-semibold text-xl mb-6">Date/Time</h3>
              <p className="text-gray-500">
                Date and time related spanish words
              </p>
            </button>
          </Link>
        </div>
      </div>

      {/* learning container */}

      <div className="mt-32">
        <div className="flex gap-6 items-center">
          <h2 className="text-2xl font-semibold">Learning</h2>
          <Link href="/learning" className="underline text-sm">
            See All
          </Link>
        </div>
        <hr className="w-full h-[2px] bg-orange-200 mt-2 mb-4" />
        <div className="flex gap-4">
          <Link href={"/keywords"}>
            <button className="bg-orange-200 py-6 px-4 text-left rounded-md max-w-[200px] drop-shadow-sm transition-transform hover:scale-[1.02]">
              <h3 className="font-semibold text-xl mb-6">Keywords</h3>
              <p className="text-gray-500">
                Helpful keywords for everyday speaking
              </p>
            </button>
          </Link>
          <Link href={"/date-time"}>
            <button className="bg-orange-100 py-6 px-4 text-left rounded-md max-w-[200px] drop-shadow-sm transition-transform hover:scale-[1.02]">
              <h3 className="font-semibold text-xl mb-6">Date/Time</h3>
              <p className="text-gray-500">
                Date and time related spanish words
              </p>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

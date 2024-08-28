import Link from "next/link";

export default function page() {
  return (
    <div className="">
      <div className="flex gap-6 items-center">
        <h1 className="text-4xl font-semibold">Games</h1>
        <Link href="/games" className="underline text-sm">
          See All
        </Link>
      </div>
      <hr className="w-full h-[2px] bg-orange-200 mt-2 mb-4" />
      <FilterBar />
      <div className="flex gap-4 mt-4">
        <Link href={"/games/keywords"}>
          <button className="bg-orange-200 py-6 px-4 text-left rounded-md max-w-[200px] drop-shadow-sm transition-transform hover:scale-[1.02]">
            <h3 className="font-semibold text-xl mb-6">Keywords</h3>
            <p className="text-gray-500">
              Helpful keywords for everyday speaking
            </p>
          </button>
        </Link>
        <Link href={"/games/date-time"}>
          <button className="bg-orange-100 py-6 px-4 text-left rounded-md max-w-[200px] drop-shadow-sm transition-transform hover:scale-[1.02]">
            <h3 className="font-semibold text-xl mb-6">Date/Time</h3>
            <p className="text-gray-500">Date and time related spanish words</p>
          </button>
        </Link>
      </div>
      <div className="flex gap-4 mt-4">
        <Link href={"/games/verbs"}>
          <button className="bg-orange-200 py-6 px-4 text-left rounded-md max-w-[200px] drop-shadow-sm transition-transform hover:scale-[1.02]">
            <h3 className="font-semibold text-xl mb-6">Verbs</h3>
            <p className="text-gray-500">
              Helpful keywords for everyday speaking
            </p>
          </button>
        </Link>
        <Link href={"/games/numbers"}>
          <button className="bg-orange-100 py-6 px-4 text-left rounded-md max-w-[200px] drop-shadow-sm transition-transform hover:scale-[1.02]">
            <h3 className="font-semibold text-xl mb-6">Numbers</h3>
            <p className="text-gray-500">Date and time related spanish words</p>
          </button>
        </Link>
      </div>
    </div>
  );
}

export function FilterBar() {
  return (
    <div className="flex gap-2 overflow-x-scroll">
      <button className="bg-slate-100 rounded-full py-1 px-3 transition-[filter] hover:brightness-95">
        Multi-choice
      </button>
      <button className="bg-slate-100 rounded-full py-1 px-3 transition-[filter] hover:brightness-95">
        Verbs
      </button>
      <button className="bg-slate-100 rounded-full py-1 px-3 transition-[filter] hover:brightness-95">
        Spelling
      </button>
    </div>
  );
}

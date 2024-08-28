import Link from "next/link";

export default function Home() {
  return (
    <main className="px-4 py-20 bg-orange-100">
      <h1 className="text-4xl font-bold text-center mb-2">
        Practice common spanish
      </h1>
      <p className="text-orange-500 text-center">
        Browser quick quiz style games to imporove you common spanish words
      </p>
      <div className="mt-32">
        <h2 className="text-2xl font-semibold">Most popular games</h2>
        <hr className="w-full h-[2px] bg-orange-200 mt-2 mb-4" />
        <div className="flex gap-4">
          <Link href={"/keywords"}>
            <button className="bg-white py-6 px-4 text-left rounded-md max-w-[200px] drop-shadow-sm transition-transform hover:scale-[1.02]">
              <h3 className="font-semibold text-xl mb-6">Keywords</h3>
              <p className="text-gray-500">
                Helpful keywords for everyday speaking
              </p>
            </button>
          </Link>
          <Link href={"/date-time"}>
            <button className="bg-white py-6 px-4 text-left rounded-md max-w-[200px] drop-shadow-sm transition-transform hover:scale-[1.02]">
              <h3 className="font-semibold text-xl mb-6">Date/Time</h3>
              <p className="text-gray-500">
                Date and time related spanish words
              </p>
            </button>
          </Link>
        </div>
      </div>
      <div className="bg-white h-[400px] flex justify-center items-center mt-10">
        <h2>Learning Banner Area</h2>
      </div>
      <div className="bg-white h-[400px] flex justify-center items-center mt-10">
        <h2>Learning Banner Area</h2>
      </div>
    </main>
  );
}

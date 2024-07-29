import verbData from "../../data/verbs.json";
import VerbInputCard from "./VerbInputCard";

export default function VerbConj() {
  const index = 0;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-3 capitalize">
        {verbData[index].spanish} / {verbData[index].english}
        <span className="text-base text-orange-500 ml-2">(present tense)</span>
      </h1>
      <p className="mb-6 sm:mb-10">
        Answer all 6 verb conjugations correctly to move onto the next verb.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <VerbInputCard
          classes="py-6 sm:pr-6 sm:pb-6 sm:pt-0 sm:border-r-2 border-b-2"
          title="Yo"
          answer={verbData[0].present.individual.yo.spanish}
        />

        <div className="py-6 sm:pl-6 sm:pb-6 sm:pt-0 border-orange-200 border-b-2">
          <div className="mb-4 sm:mb-6 flex justify-between text-sm">
            <label htmlFor="nosotros" className="font-medium">
              Nosotros/Nosotras
            </label>
            <button className="border border-orange-400 text-orange-400 rounded-md px-1 hover:brightness-110">
              Show Answer
            </button>
          </div>
          <input
            type="text"
            id="nosotros"
            className="bg-white w-full rounded-sm p-2 text-base drop-shadow-md"
            placeholder="..."
          />
        </div>
        <div className="py-6 sm:pr-6 sm:py-6 border-orange-200 sm:border-r-2 border-b-2">
          <div className="mb-4 sm:mb-6 flex justify-between text-sm">
            <label htmlFor="tu" className="font-medium">
              Tú
            </label>
            <button className="border border-orange-400 text-orange-400 rounded-md px-1 hover:brightness-110">
              Show Answer
            </button>
          </div>
          <input
            type="text"
            id="tu"
            className="bg-white w-full rounded-sm p-2 text-base drop-shadow-md"
            placeholder="..."
          />
        </div>
        <div className="py-6 sm:pl-6 sm:py-6 border-orange-200 border-b-2">
          <div className="mb-4 sm:mb-6 flex justify-between text-sm">
            <label htmlFor="vosotros" className="font-medium">
              Vosotros/Vosotras
            </label>
            <button className="border border-orange-400 text-orange-400 rounded-md px-1 hover:brightness-110">
              Show Answer
            </button>
          </div>
          <input
            type="text"
            id="vosotros"
            className="bg-white w-full rounded-sm p-2 text-base drop-shadow-md"
            placeholder="..."
          />
        </div>
        <div className="py-6 sm:pr-6 sm:pt-6 border-orange-200 sm:border-r-2 border-b-2 sm:border-b-0">
          <div className="mb-4 sm:mb-6 flex justify-between text-sm">
            <label htmlFor="el" className="font-medium">
              Él/Ella/Usted
            </label>
            <button className="border border-orange-400 text-orange-400 rounded-md px-1 hover:brightness-110">
              Show Answer
            </button>
          </div>
          <input
            type="text"
            id="el"
            className="bg-white w-full rounded-sm p-2 text-base drop-shadow-md"
            placeholder="..."
          />
        </div>
        <div className="py-6 sm:pl-6 sm:pt-6">
          <div className="mb-4 sm:mb-6 flex justify-between text-sm">
            <label htmlFor="ellos" className="font-medium">
              Ellos/Ellas/Ustedes
            </label>
            <button className="border border-orange-400 text-orange-400 rounded-md px-1 hover:brightness-110">
              Show Answer
            </button>
          </div>
          <input
            type="text"
            id="ellos"
            className="bg-white w-full rounded-sm p-2 text-base drop-shadow-md"
            placeholder="..."
          />
        </div>
      </div>
      <button className="bg-green-500 font-medium text-white rounded-md px-4 py-1 mt-6 sm:mt-10 hover:brightness-110">
        Submit
      </button>
    </div>
  );
}

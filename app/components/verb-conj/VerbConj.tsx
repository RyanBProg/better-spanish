import verbData from "../../data/verbs.json";
import VerbInputCard from "./VerbInputCard";

export default function VerbConj() {
  const index = 0;

  return (
    <div className="mx-auto max-w-[1100px]">
      <h1 className="font-semibold">Verb Conjugations</h1>
      <p className="mb-10">
        Answer all 6 verb conjugations correctly to move onto the next verb.
      </p>
      <h2 className="text-4xl font-semibold capitalize">
        {verbData[index].spanish}
        <span className="text-base ml-2"> - {verbData[index].english}</span>
      </h2>
      <p className="text-base text-orange-500 mb-6 md:mb-10">(present tense)</p>
      <div className="grid grid-cols-1 md:grid-cols-2 mb-10">
        <VerbInputCard
          classes="py-6 md:pr-6 md:pb-6 md:pt-0 md:border-r-2 border-b-2"
          title="Yo"
          answer={verbData[0].present.individual.yo.spanish}
        />
        <VerbInputCard
          classes="py-6 md:pl-6 md:pb-6 md:pt-0 border-b-2"
          title="Nosotros Nosotras"
          answer={verbData[0].present.plural.nosotros.spanish}
        />
        <VerbInputCard
          classes="py-6 md:pr-6 md:border-r-2 border-b-2"
          title="Tú"
          answer={verbData[0].present.individual.tú.spanish}
        />
        <VerbInputCard
          classes="py-6 md:pl-6 border-b-2"
          title="Vosotros Vosotras"
          answer={verbData[0].present.plural.nosotros.spanish}
        />
        <VerbInputCard
          classes="py-6 md:pr-6 md:pt-6 md:border-r-2 border-b-2 md:border-b-0"
          title="Él Ella Usted"
          answer={verbData[0].present.individual.él.spanish}
        />
        <VerbInputCard
          classes="py-6 md:pl-6 md:pt-6"
          title="Ellos Ellas Ustedes"
          answer={verbData[0].present.plural.ellos.spanish}
        />
      </div>
      <h2 className="text-4xl font-semibold capitalize">
        {verbData[index].spanish}
        <span className="text-base ml-2"> - {verbData[index].english}</span>
      </h2>
      <p className="text-base text-orange-500 mb-6 md:mb-10">(past tense)</p>
      <div className="grid grid-cols-1 md:grid-cols-2 mb-10">
        <VerbInputCard
          classes="py-6 md:pr-6 md:pb-6 md:pt-0 md:border-r-2 border-b-2"
          title="Yo"
          answer={verbData[0].past.individual.yo.spanish}
        />
        <VerbInputCard
          classes="py-6 md:pl-6 md:pb-6 md:pt-0 border-b-2"
          title="Nosotros Nosotras"
          answer={verbData[0].past.plural.nosotros.spanish}
        />
        <VerbInputCard
          classes="py-6 md:pr-6 md:border-r-2 border-b-2"
          title="Tú"
          answer={verbData[0].past.individual.tú.spanish}
        />
        <VerbInputCard
          classes="py-6 md:pl-6 border-b-2"
          title="Vosotros Vosotras"
          answer={verbData[0].past.plural.nosotros.spanish}
        />
        <VerbInputCard
          classes="py-6 md:pr-6 md:pt-6 md:border-r-2 border-b-2 md:border-b-0"
          title="Él Ella Usted"
          answer={verbData[0].past.individual.él.spanish}
        />
        <VerbInputCard
          classes="py-6 md:pl-6 md:pt-6"
          title="Ellos Ellas Ustedes"
          answer={verbData[0].past.plural.ellos.spanish}
        />
      </div>
      <h2 className="text-4xl font-semibold capitalize">
        {verbData[index].spanish}
        <span className="text-base ml-2"> - {verbData[index].english}</span>
      </h2>
      <p className="text-base text-orange-500 mb-6 md:mb-10">(gerund)</p>
      <VerbInputCard
        classes="py-6 md:pr-6 md:pb-6 md:pt-0"
        title="Yo"
        answer={verbData[0].gerund.spanish}
      />
    </div>
  );
}

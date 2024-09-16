type Props = {
  espWord: string;
  engWord: string;
};

export default function Heading({ espWord, engWord }: Props) {
  return (
    <div className="mb-5">
      <h1 className="font-semibold">Verb Conjugations</h1>
      <p className="mb-10">
        Answer all 6 verb conjugations for all 3 tenses and the gerund
        conjugation correctly to move onto the next verb.
      </p>
      <h2 className="text-4xl font-semibold capitalize">
        {espWord}
        <span className="text-base ml-2"> - {engWord}</span>
      </h2>
    </div>
  );
}

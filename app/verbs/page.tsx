import VerbConj from "../components/verb-conj/VerbConj";

const intialFormState = {
  present: {
    yo: "",
    tu: "",
    el: "",
    nosotros: "",
    vosotros: "",
    ellos: "",
  },
  past: {
    yo: "",
    tu: "",
    el: "",
    nosotros: "",
    vosotros: "",
    ellos: "",
  },
  gerund: "",
};

export default function Home() {
  return (
    <main className="px-4 py-10 bg-orange-100 min-h-screen">
      <VerbConj />
    </main>
  );
}

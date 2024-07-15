import colorsImage from "../../public/images/cheat-sheets/colors/spanish-colors-colores.jpg";
import travelImage from "../../public/images/cheat-sheets/travel/phrases-travel.jpg";
import bodyPartsImage from "../../public/images/cheat-sheets/body/body-parts.jpg";
import locationImage from "../../public/images/cheat-sheets/direction/location.jpg";
import Dropdown from "../components/dropdown/Dropdown";

export default function Home() {
  return (
    <main className="px-4 py-10 bg-orange-100">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-center mb-2">
          Learn more spanish words
        </h1>
        <p className="text-orange-500 text-center">
          Get to grips with plenty of common spanish words with our handy cheat
          sheets
        </p>
      </div>
      <Dropdown image={colorsImage} title={"Colors"} />
      <Dropdown image={travelImage} title={"Travel phrases"} />
      <Dropdown image={bodyPartsImage} title={"Body parts"} />
      <Dropdown image={locationImage} title={"Location words"} />
    </main>
  );
}

import colorsImage from "../../public/images/cheat-sheets/colors/spanish-colors-colores.jpg";
import travelImage from "../../public/images/cheat-sheets/travel/phrases-travel.jpg";
import bodyPartsImage from "../../public/images/cheat-sheets/body/body-parts.jpg";
import locationImage from "../../public/images/cheat-sheets/direction/location.jpg";
import directionsImage from "../../public/images/cheat-sheets/direction/directions.jpg";
import feelingsImage from "../../public/images/cheat-sheets/conversational/feelings.jpg";
import greetingsImage from "../../public/images/cheat-sheets/conversational/greetings.jpg";
import bathroomItemsImage from "../../public/images/cheat-sheets/items/bathroom-items.jpg";
import clothingItemsImage from "../../public/images/cheat-sheets/items/clothing-items.jpg";
import householdItemsImage from "../../public/images/cheat-sheets/items/household-items.jpg";
import kitchenItemsImage from "../../public/images/cheat-sheets/items/kitchen-items.jpg";

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
      <Dropdown images={[colorsImage]} title={"Colors"} />
      <Dropdown images={[travelImage]} title={"Travel phrases"} />
      <Dropdown images={[bodyPartsImage]} title={"Body parts"} />
      <Dropdown
        images={[locationImage, directionsImage]}
        title={"Directional words"}
      />
      <Dropdown
        images={[feelingsImage, greetingsImage]}
        title={"Conversational phrases"}
      />
      <Dropdown
        images={[
          bathroomItemsImage,
          clothingItemsImage,
          householdItemsImage,
          kitchenItemsImage,
        ]}
        title={"Item words"}
      />
    </main>
  );
}

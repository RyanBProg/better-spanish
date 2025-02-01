import { db } from "./drizzle";
import { words } from "./schema";
import { words as seedData } from "./wordsSeedData";

async function seed() {
  console.log("🌱 Seeding database...");

  try {
    // Clear existing data
    await db.delete(words);

    // Insert in batches of 100 to avoid any limitations
    for (let i = 0; i < seedData.length; i += 100) {
      const batch = seedData.slice(i, i + 100);
      await db.insert(words).values(batch);
    }

    console.log(`✅ Seeded ${seedData.length} words successfully!`);
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

// Run seeding
seed().catch(console.error);

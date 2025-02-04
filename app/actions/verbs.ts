"use server";

import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { verbs, verbTenses } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export const getVerbConjugations = async (lookupId?: number) => {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  !isUserAuthenticated && redirect("/api/auth/login");

  if (lookupId) {
    // get a specified verb from the db
    const verbId = lookupId;
    const verbData = await db
      .select()
      .from(verbTenses)
      .where(eq(verbTenses.verbId, verbId));
    return { verbId, verbData };
  } else {
    // get a random verb from the db
    const dbVerbs = await db.select().from(verbs);
    const randomIndex = Math.floor(Math.random() * dbVerbs.length);
    const verbId = dbVerbs[randomIndex].id;
    const verbData = await db
      .select()
      .from(verbTenses)
      .where(eq(verbTenses.verbId, verbId));
    return { verbId, verbData };
  }
};

export const getVerbs = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  !isUserAuthenticated && redirect("/api/auth/login");

  return await db.select().from(verbs);
};

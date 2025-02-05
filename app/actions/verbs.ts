"use server";

import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { verbs, verbTenses } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { BaseVerb, VerbConjugationData } from "@/lib/types";

type GetVerbConjugationsResponse = {
  verbId: number;
  verbData: VerbConjugationData[];
};

type ActionResponse<T = void> = {
  success: boolean;
  data?: T;
  error?: string;
};

export const getVerbConjugations = async (
  lookupId?: number
): Promise<ActionResponse<GetVerbConjugationsResponse>> => {
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

    if (!verbData) {
      return { success: false, error: "Database operation failed" };
    }

    return { success: true, data: { verbId, verbData } };
  } else {
    // get a random verb from the db
    const dbVerbs = await db.select().from(verbs);
    const randomIndex = Math.floor(Math.random() * dbVerbs.length);
    const verbId = dbVerbs[randomIndex].id;
    const verbData = await db
      .select()
      .from(verbTenses)
      .where(eq(verbTenses.verbId, verbId));

    if (!verbData) {
      return { success: false, error: "Database operation failed" };
    }

    return { success: true, data: { verbId, verbData } };
  }
};

export const getVerbs = async (): Promise<ActionResponse<BaseVerb[]>> => {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  !isUserAuthenticated && redirect("/api/auth/login");

  try {
    const verbList = await db.select().from(verbs);
    return { success: true, data: verbList };
  } catch (error) {
    return { success: false, error: "Database operation failed" };
  }
};

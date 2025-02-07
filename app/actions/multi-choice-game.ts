"use server";

import { db } from "@/db/drizzle";
import { words } from "@/db/schema";
import { Word } from "@/lib/types";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { sql } from "drizzle-orm";
import { redirect } from "next/navigation";

type ActionResponse<T = void> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export const getQuestion = async (): Promise<ActionResponse<Word[]>> => {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  !isUserAuthenticated && redirect("/api/auth/login");

  try {
    const newWords = await db
      .select()
      .from(words)
      .orderBy(sql`RANDOM()`)
      .limit(3);

    if (!newWords) {
      return { success: false, error: "Database operation failed" };
    }

    return { success: true, data: newWords };
  } catch (error) {
    return { success: false, error: "An unexpected error occurred" };
  }
};

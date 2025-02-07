"use server";

import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const resetAccountStats = async (kindeUserId: string) => {
  if (!kindeUserId) {
    return { success: false, error: "No user ID provided" };
  }

  try {
    await db.delete(users).where(eq(users.kindeId, kindeUserId));

    return {
      success: true,
      message: "Account reset successfully",
    };
  } catch (error) {
    console.error("Reset account error:", error);
    return { success: false, error: "Database operation failed" };
  }
};

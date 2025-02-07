"use server";

import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

export async function getOrCreateUser(
  kindeUser: KindeUser<Record<string, any>>
) {
  if (!kindeUser?.id) {
    throw new Error("Missing required user data");
  }

  // Try to find existing user
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.kindeId, kindeUser.id))
    .then((res) => res[0]);

  if (existingUser) return existingUser;

  // Create new user if not found
  const [newUser] = await db
    .insert(users)
    .values({
      kindeId: kindeUser.id,
      email: kindeUser.email ?? "",
      family_name: kindeUser.family_name ?? "",
      given_name: kindeUser.given_name ?? "",
    })
    .returning();

  return newUser;
}

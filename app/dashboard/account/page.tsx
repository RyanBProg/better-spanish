"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import AccountCard from "@/components/account/accountCard";

export default async function page() {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();

  return (
    <div className="width-container my-10 sm:my-20">
      <div className="width-inner mx-auto my-10 sm:my-20 max-w-md">
        <AccountCard kindeUser={kindeUser} />
      </div>
    </div>
  );
}

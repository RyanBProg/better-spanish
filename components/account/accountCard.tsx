"use client";

import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { resetAccountStats } from "@/app/actions/account";
import { useRouter } from "next/navigation";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

type Props = {
  kindeUser: KindeUser<Record<string, any>>;
};

export default function AccountCard({ kindeUser }: Props) {
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState("");
  const router = useRouter();

  const handleResetConfirm = async () => {
    if (resetConfirmation === "yes_please") {
      await resetAccountStats(kindeUser.id);
      setIsResetDialogOpen(false);
      setResetConfirmation("");
      router.push("/dashboard");
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Account Information</h1>
      <div className="space-y-4 mb-8">
        <div>
          <Label htmlFor="givenName">Given Name</Label>
          <Input id="givenName" value={kindeUser.given_name || ""} readOnly />
        </div>
        <div>
          <Label htmlFor="familyName">Family Name</Label>
          <Input id="familyName" value={kindeUser.family_name || ""} readOnly />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={kindeUser.email || ""} readOnly />
        </div>
      </div>
      <div className="space-x-4">
        <LogoutLink className={buttonVariants({ variant: "outline" })}>
          Log Out
        </LogoutLink>
        <Button variant="outline" onClick={() => setIsResetDialogOpen(true)}>
          Reset Account Stats
        </Button>
      </div>
      <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Account Stats</DialogTitle>
            <DialogDescription>
              Are you sure you'd like to reset all of your account's progress?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="resetConfirmation">
              Type "yes_please" to confirm:
            </Label>
            <Input
              id="resetConfirmation"
              value={resetConfirmation}
              onChange={(e) => setResetConfirmation(e.target.value)}
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsResetDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleResetConfirm}
              disabled={resetConfirmation !== "yes_please"}>
              Reset Stats
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

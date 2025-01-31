import type { Metadata } from "next";
import DashboardNav from "@/components/layout/DashboardNav";

export const metadata: Metadata = {
  title: "Better Spanish",
  description: "Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DashboardNav />
      <main>{children}</main>
    </>
  );
}

import DashboardNav from "@/components/layout/DashboardNav";

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

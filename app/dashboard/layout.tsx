import DashboardNav from "@/components/layout/DashboardNav";
import Footer from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DashboardNav />
      <main>{children}</main>
      <Footer />
    </>
  );
}

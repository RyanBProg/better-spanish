import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/nav-bar/Navbar";

export const metadata: Metadata = {
  title: "Better Spanish",
  description: "Learn Spanish The Better Way",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col-reverse md:flex-row h-[100dvh] p-2 sm:p-3 md:p-4">
        <Navbar />
        <main className="flex-grow pt-2 sm:pt-3 md:pt-4 overflow-y-scroll relative">
          {children}
        </main>
      </body>
    </html>
  );
}

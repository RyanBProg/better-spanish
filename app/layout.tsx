import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Better Spanish",
  description: "Learn Spanish Efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-dvh w-screen flex flex-col relative overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

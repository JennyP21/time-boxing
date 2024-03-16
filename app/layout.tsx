import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import UIProvider from "./UIProvider";
import Navbar from "./Navbar";

const openSans = Open_Sans({
  weight: ["300", "500", "700"],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Time Boxing",
  description: "Block your time with our industry leading project management solution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <UIProvider>
          <Navbar />
          {children}
        </UIProvider>
      </body>
    </html>
  );
}

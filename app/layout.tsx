import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import UIProvider from "./UIProvider";
import Navbar from "./Navbar";
import AuthProvider from "./auth/Provider";

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
        <AuthProvider>
          <UIProvider>
            <Navbar />
            {children}
          </UIProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

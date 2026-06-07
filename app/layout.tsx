import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "../components/error/Toast";
import AuthProvider from "./auth/Provider";
import "./globals.css";
import ReduxProvider from "./ReduxProvider";
import UIProvider from "./UIProvider";

const inter = Inter({
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
      <body className={`${inter.className} overflow-hidden`}>
        <ReduxProvider>
          <AuthProvider>
            <UIProvider>
              {children}
            </UIProvider>
          </AuthProvider>
        </ReduxProvider>
        <ToastContainer position='bottom-right' />
      </body>
    </html>
  );
}

import { Box, Flex } from "@chakra-ui/react";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import LeftPanel from "./LeftPanel";
import Navbar from "./Navbar";
import UIProvider from "./UIProvider";
import AuthProvider from "./auth/Provider";
import "./globals.css";
import ReduxProvider from "./ReduxProvider";
import { ToastContainer } from "./api/Toast";

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
      <body className={`${openSans.className} overflow-hidden`}>
        <ReduxProvider>
          <AuthProvider>
            <UIProvider>
              <Flex className="flex-col h-full">
                <Navbar />
                <Flex className="w-full h-full mt-16">
                  <LeftPanel />
                  <Box className="md:ml-[4.4rem] w-full">
                    {children}
                  </Box>
                </Flex>
              </Flex>
            </UIProvider>
          </AuthProvider>
        </ReduxProvider>
        <ToastContainer position='bottom-right' />
      </body>
    </html>
  );
}

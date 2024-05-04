import { Box, Flex } from "@chakra-ui/react";
import type { Metadata } from "next";
import LeftPanel from "./LeftPanel";

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
        <Flex className="w-full h-full mt-16">
            <LeftPanel />
            <Box className="w-[calc(100%-var(--left-panel-size))] max-md:w-full">
                {children}
            </Box>
        </Flex>
    );
}
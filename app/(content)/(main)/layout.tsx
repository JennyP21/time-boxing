import { Box, Grid } from "@chakra-ui/react";
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
        <Grid
            className="w-full h-full mt-16 justify-start items-start"
            templateColumns={{ base: "1fr", md: "var(--left-panel-size) calc(100% - var(--left-panel-size))" }}
            templateRows={{ base: "auto 1fr", md: "1fr" }}
        >
            <LeftPanel />
            <Box className="max-w-full h-full overflow-hidden">
                {children}
            </Box>
        </Grid>
    );
}
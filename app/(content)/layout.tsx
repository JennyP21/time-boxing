import { Flex } from "@chakra-ui/react";
import Navbar from "../Navbar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Flex className="flex-col h-full">
            <Navbar />
            {children}
        </Flex>
    );
}

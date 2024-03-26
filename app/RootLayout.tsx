import { Box, Flex } from "@chakra-ui/react";
import LeftPanel from "./LeftPanel";
import Navbar from "./Navbar";
import UIProvider from "./UIProvider";
import AuthProvider from "./auth/Provider";
import ReduxProvider from "./ReduxProvider";
import { openSans } from "./layout";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${openSans.className}`}>
                <ReduxProvider>
                    <AuthProvider>
                        <UIProvider>
                            <Flex direction={'column'}>
                                <Navbar />
                                <Flex width='100%' mt={16}>
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

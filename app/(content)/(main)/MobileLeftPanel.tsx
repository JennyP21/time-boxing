"use client"
import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Icon, useDisclosure } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import MobileLeftPanelContent from "./MobileLeftPanelContent";

const MobileLeftPanel = () => {
    const session = useSession();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const menuRef = useRef<SVGSVGElement>(null);

    return (
        <>
            {session.data && <Box className="md:hidden">
                <Icon ref={menuRef} as={RxHamburgerMenu} w={6} h={6} onClick={onOpen} />
                <Drawer
                    size="xs"
                    isOpen={isOpen}
                    placement='left'
                    onClose={onClose}
                    finalFocusRef={menuRef}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerCloseButton />
                        </DrawerHeader>
                        <DrawerBody>
                            <MobileLeftPanelContent data={session.data} />
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Box>}
        </>
    )
}

export default MobileLeftPanel
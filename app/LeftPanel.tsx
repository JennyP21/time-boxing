"use client";
import { Box, Flex, HStack, Icon, Link, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { BsKanban } from "react-icons/bs";
import { FaRegArrowAltCircleLeft, FaRegListAlt } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { RiMenuUnfoldFill } from "react-icons/ri";

const LeftPanel = () => {
    const [isOpen, setIsOpen] = useState(false);

    const panelItems = [
        {
            name: "Dashboard",
            icon: IoHomeOutline,
            href: "/"
        },
        {
            name: "Kanban View",
            icon: BsKanban,
            href: "/kanban"
        },
        {
            name: "List View",
            icon: FaRegListAlt,
            href: "/list"
        }
    ]

    return (
        <VStack
            className='transition-all duration-300 max-md:hidden overflow-hidden'
            borderRight="1px"
            borderColor={'gray.300'}
            px={3}
            py={3}
            width={isOpen ? "12%" : "3.5%"}
            minWidth={isOpen ? "170px" : "55px"}
            height="100vh"
        >
            <Box width="100%">
                {isOpen ?
                    <Icon className={isOpen ? "sidebar__icon opacity-1" : "sidebar__icon opacity-0"} as={FaRegArrowAltCircleLeft} w={7} h={7} onClick={() => setIsOpen(false)} />
                    :
                    <Icon className={isOpen ? "sidebar__icon opacity-0" : "sidebar__icon opacity-1"} as={RiMenuUnfoldFill} w={7} h={7} onClick={() => setIsOpen(true)} />
                }
            </Box>
            <Flex className='whitespace-nowrap w-full' flexDir="column" marginTop={10} gap={6}>
                {panelItems.map(item => (
                    <Link href={item.href} key={item.name}>
                        <HStack _hover={{ bg: "gray.200" }} rounded="5px" spacing={5} cursor='pointer'>
                            <Icon as={item.icon} w={7} h={7} />
                            <Text>{item.name}</Text>
                        </HStack>
                    </Link>
                ))}
            </Flex>
        </VStack>
    )
}

export default LeftPanel
"use client";
import { Box, Flex, HStack, Link, Text, Icon } from '@chakra-ui/react';
import { BsKanban } from "react-icons/bs";
import { FaRegListAlt } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { useState } from 'react';

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
        <Box className='transition-all duration-300 max-md:hidden relative overflow-hidden' borderRight="1px" borderColor={'gray.300'} minWidth={isOpen ? { sm: '25%', lg: "15%" } : "4%"} p={3} height="100vh">
            {isOpen ?
                <Icon className={isOpen ? "sidebar__icon opacity-1" : "sidebar__icon opacity-0"} as={FaRegArrowAltCircleLeft} w={8} h={8} onClick={() => setIsOpen(false)} />
                :
                <Icon className={isOpen ? "sidebar__icon opacity-0" : "sidebar__icon opacity-1"} as={RiMenuUnfoldFill} w={8} h={8} onClick={() => setIsOpen(true)} />
            }
            <Flex className='absolute whitespace-nowrap w-full' flexDir="column" marginTop={10} gap={6}>
                {panelItems.map(item => (
                    <Link href={item.href} key={item.name}>
                        <HStack _hover={{ bg: "gray.100" }} rounded="5px" p={1} spacing={5} cursor='pointer'>
                            <Icon as={item.icon} w={8} h={8} />
                            <Text>{item.name}</Text>
                        </HStack>
                    </Link>
                ))}
            </Flex>
        </Box>
    )
}

export default LeftPanel
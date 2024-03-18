"use client";
import { Box, Flex, HStack, Link, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';

const LeftPanel = () => {
    const [isOpen, setIsOpen] = useState(false);

    const panelItems = [
        {
            name: "Kanban View",
            icon: "/icons/kanban-board.svg",
            href: "#"
        },
        {
            name: "List View",
            icon: "/icons/list-view.svg",
            href: "#"
        }
    ]

    return (
        <Box className='transition-all duration-300 max-md:hidden relative overflow-hidden' borderRight="1px" borderColor={'gray.300'} minWidth={isOpen ? { sm: '25%', lg: "15%" } : "4%"} p={3} height="100vh">
            <Box className='relative' width={10} height={10}>
                {isOpen ?
                    <Image src='/icons/arrow.svg' fill alt="Close Sidebar" className={isOpen ? "sidebar__icon opacity-1" : "sidebar__icon opacity-0"} onClick={() => setIsOpen(false)} />
                    :
                    <Image src='/icons/menu-bar.svg' fill alt="Sidebar" className={isOpen ? "sidebar__icon opacity-0" : "sidebar__icon opacity-1"} onClick={() => setIsOpen(true)} />
                }
            </Box>
            <Flex className='absolute whitespace-nowrap w-full' flexDir="column" marginTop={10} gap={6}>
                {panelItems.map(item => (
                    <Link href={item.href}>
                        <HStack _hover={{ bg: "gray.100" }} rounded="5px" p={1} spacing={5} key={item.name} cursor='pointer'>
                            <Box className='relative' minWidth={7} minHeight={7}>
                                <Image className='object-contain' src={item.icon} fill alt={item.name} />
                            </Box>
                            <Text>{item.name}</Text>
                        </HStack>
                    </Link>
                ))}
            </Flex>
        </Box>
    )
}

export default LeftPanel
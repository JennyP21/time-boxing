"use client";
import { Icon, Link, Text, VStack } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { BsKanban } from "react-icons/bs";
import { FaRegListAlt } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";

const LeftPanel = () => {

    const path = usePathname();

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
            className='transition-all duration-300 max-md:!hidden min-h-full w-[4.4rem] fixed'
            borderRight="1px"
            borderColor={'gray.300'}
            py={1}
            bg="white"
        >
            {panelItems.map(item => (
                <Link href={item.href} key={item.name}>
                    <VStack _hover={{ bg: "gray.50" }} rounded="5px" spacing={2} p={1} cursor='pointer'>
                        <Icon as={item.icon} w={7} h={7} boxShadow={path === item.href ? "2xl" : ""} />
                        <Text fontSize='x-small' textDecor={path === item.href ? "underline" : ""}>{item.name}</Text>
                    </VStack>
                </Link>
            ))}
        </VStack>
    )
}

export default LeftPanel
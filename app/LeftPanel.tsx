"use client";
import { HStack, Icon, Link, Text, VStack } from '@chakra-ui/react';
import { IoHomeOutline } from 'react-icons/io5';
import PersonalList from './PersonalList';
import SharedList from './SharedList';

const LeftPanel = () => {

    return (
        <VStack
            className='transition-all duration-300 max-md:!hidden min-h-full w-[var(--left-panel-size)] fixed'
            borderRight="1px"
            borderColor={'gray.300'}
            p={2}
            bg="white"
        >
            <Link className='w-full' href="/" _hover={{ textDecor: "none" }}>
                <HStack className='justify-between px-2 py-1 rounded-lg' _hover={{
                    bg: "gray.100"
                }}>
                    <Text>Home</Text>
                    <Icon as={IoHomeOutline} w={4} h={4} />
                </HStack>
            </Link>
            <PersonalList />
            <SharedList />
        </VStack>
    )
}

export default LeftPanel
"use client";
import { Link } from '@chakra-ui/next-js';
import { Flex, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { GrProjects } from "react-icons/gr";
import { IoHomeOutline } from 'react-icons/io5';
import AddProjectContainer from './AddProjectContainer';
import AddTeamContainer from './AddTeamContainer';
import PersonalList from './PersonalList';
import Teams from './Teams';

const LeftPanel = () => {
    const session = useSession();
    return (
        <Flex className='flex-col w-full h-full'>
            <VStack
                className='transition-all duration-300 max-md:!hidden flex-[1_0_0] overflow-y-scroll'
                borderRight="1px"
                borderColor={'gray.300'}
                bg="white"
                p={2}
            >
                <Link className='w-full' href="/dashboard" _hover={{ textDecor: "none" }}>
                    <HStack className='justify-between px-2 py-1 rounded-lg' border="1px" borderColor="gray.300" _hover={{
                        bg: "gray.100"
                    }}>
                        <Text className='font-medium text-sm'>Dashboard</Text>
                        <Icon as={IoHomeOutline} w={4} h={4} />
                    </HStack>
                </Link>
                <Link className='w-full' href="/project" _hover={{ textDecor: "none" }}>
                    <HStack className='justify-between px-2 py-1 rounded-lg' border="1px" borderColor="gray.300" _hover={{
                        bg: "gray.100"
                    }}>
                        <Text className='font-medium text-sm'>All Projects</Text>
                        <Icon as={GrProjects} w={4} h={4} />
                    </HStack>
                </Link>
                {session.data &&
                    <>
                        <PersonalList user_id={session.data.user.id} />
                        <Teams user_id={session.data.user.id} />
                        <AddTeamContainer user_id={session.data.user.id} />
                        <AddProjectContainer user_id={session.data.user.id} />
                    </>
                }
            </VStack>
        </Flex>
    )
}

export default LeftPanel
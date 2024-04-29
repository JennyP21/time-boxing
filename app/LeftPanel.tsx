"use client";
import { Link } from '@chakra-ui/next-js';
import { HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { IoHomeOutline } from 'react-icons/io5';
import AddOrUpdateTeamContainer from './AddOrUpdateTeamContainer';
import AddOrUpdateProjectContainer from './AddOrUpdateProjectContainer';
import PersonalList from './PersonalList';
import Teams from './Teams';

const LeftPanel = () => {
    const session = useSession();
    return (
        <VStack
            className='transition-all duration-300 max-md:!hidden min-h-full w-[var(--left-panel-size)] fixed'
            borderRight="1px"
            borderColor={'gray.300'}
            p={2}
            bg="white"
        >
            <Link className='w-full' href="/" _hover={{ textDecor: "none" }}>
                <HStack className='justify-between px-2 py-1 rounded-lg' border="1px" borderColor="gray.300" _hover={{
                    bg: "gray.100"
                }}>
                    <Text>Home</Text>
                    <Icon as={IoHomeOutline} w={4} h={4} />
                </HStack>
            </Link>
            {session.data &&
                <>
                    <AddOrUpdateTeamContainer user_id={session.data.user.id} />
                    <AddOrUpdateProjectContainer user_id={session.data.user.id} />
                    <PersonalList user_id={session.data.user.id} />
                    <Teams user_id={session.data.user.id} />
                </>
            }
        </VStack>
    )
}

export default LeftPanel
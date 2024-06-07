import { HStack, Icon, VStack, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/react'
import { GrProjects } from 'react-icons/gr';
import { IoHomeOutline } from 'react-icons/io5';
import AddProjectContainer from './(content)/(main)/AddProjectContainer';
import AddTeamContainer from './(content)/(main)/AddTeamContainer';
import PersonalList from './(content)/(main)/PersonalList';
import Teams from './(content)/(main)/Teams';
import { Link } from '@chakra-ui/next-js';

const MobileLeftPanelContent = () => {
    const session = useSession();
    return (
        <VStack className='overflow-y-scroll mt-10'>
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
    )
}

export default MobileLeftPanelContent
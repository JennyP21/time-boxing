import { Link } from '@chakra-ui/next-js';
import { HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { Session } from 'next-auth';
import { GrProjects } from 'react-icons/gr';
import { IoHomeOutline } from 'react-icons/io5';
import AddProjectContainer from './AddProjectContainer';
import AddTeamContainer from './AddTeamContainer';
import PersonalList from './PersonalList';
import Teams from './Teams';

const MobileLeftPanelContent = ({ data }: { data: Session }) => {
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
            <>
                <PersonalList user_id={data.user.id} />
                <Teams user_id={data.user.id} />
                <AddTeamContainer user_id={data.user.id} />
                <AddProjectContainer user_id={data.user.id} />
            </>
        </VStack>
    )
}

export default MobileLeftPanelContent
"use client"
import { Box, Flex } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import TeamHeading from './TeamHeading';
import TeamsGrid from './TeamsGrid';

const TeamsPage = () => {
    const session = useSession();
    const user_id = session.data?.user.id;

    return (
        <Flex className='flex-col w-full h-full'>
            <TeamHeading>All Teams</TeamHeading>
            <Box className='p-3 overflow-scroll'>
                {user_id && <TeamsGrid user_id={user_id} />}
            </Box>
        </Flex>
    )
}

export default TeamsPage
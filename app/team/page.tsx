"use client"
import { useSession } from 'next-auth/react';
import TeamsGrid from './TeamsGrid';
import { Box, Heading } from '@chakra-ui/react';

const TeamsPage = () => {
    const session = useSession();
    const user_id = session.data?.user.id;

    return (
        <Box>
            <Heading className='p-3' borderBottom="1px" borderColor="gray.200">All Teams</Heading>
            <Box className='p-5'>
                {user_id && <TeamsGrid user_id={user_id} />}
            </Box>
        </Box>
    )
}

export default TeamsPage
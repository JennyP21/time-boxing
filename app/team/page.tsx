"use client"
import { Box } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import TeamHeading from './TeamHeading';
import TeamsGrid from './TeamsGrid';

const TeamsPage = () => {
    const session = useSession();
    const user_id = session.data?.user.id;

    return (
        <Box>
            <TeamHeading>All Teams</TeamHeading>
            <Box className='p-5'>
                {user_id && <TeamsGrid user_id={user_id} />}
            </Box>
        </Box>
    )
}

export default TeamsPage
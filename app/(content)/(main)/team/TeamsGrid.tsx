import TeamsGridLoading from '@/components/loading/TeamsGridLoading';
import { handleErrors } from '@/components/utils/handleErrors';
import { getTeamsError } from '@/constants';
import { useGetTeamsByUserIdQuery } from '@/lib/features/teamApi';
import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import Teams from '../Teams';
import TeamCard from './TeamCard';

interface Props {
    user_id: string;
}

const TeamsGrid = ({ user_id }: Props) => {
    const { data: teams, error, isLoading } = useGetTeamsByUserIdQuery(user_id);

    if (error) handleErrors(error, getTeamsError.type);

    return (
        <>
            {user_id && <Box className='w-40 mb-5'>
                <Teams user_id={user_id} />
            </Box>}
            {isLoading ?
                <TeamsGridLoading />
                :
                <Flex className='gap-2 flex-wrap'>
                    {teams?.map(team => (
                        <React.Fragment key={team.id}>
                            <TeamCard teams={team} />
                        </React.Fragment>
                    ))}
                </Flex>
            }
        </>
    )
}

export default TeamsGrid
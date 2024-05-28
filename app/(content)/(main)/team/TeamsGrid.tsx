import TeamsGridLoading from '@/components/loading/TeamsGridLoading';
import { handleErrors } from '@/components/utils/handleErrors';
import { getTeamsError } from '@/constants';
import { useGetTeamsByUserIdQuery } from '@/lib/features/teamApi';
import { Box, Flex } from '@chakra-ui/react';
import AddTeamContainer from '../AddTeamContainer';
import TeamCard from './TeamCard';

const TeamsGrid = ({ user_id }: { user_id: string }) => {
    const { data: teams, error, isLoading } = useGetTeamsByUserIdQuery(user_id);

    if (error) handleErrors(error, getTeamsError.type);

    return (
        <>
            <Box className='w-40 mb-5'>
                <AddTeamContainer user_id={user_id} />
            </Box>
            {isLoading ?
                <TeamsGridLoading />
                :
                <Flex className='gap-2 flex-wrap'>
                    {teams?.map(team => (
                        <TeamCard key={team.id} teams={team} />
                    ))}
                </Flex>
            }
        </>
    )
}

export default TeamsGrid
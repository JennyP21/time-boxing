import TeamsGridLoading from '@/components/loading/TeamsGridLoading';
import { convertToTeamList } from '@/components/utils';
import { handleErrors } from '@/components/utils/handleErrors';
import { getTeamsError } from '@/constants';
import { useGetTeamsByUserIdQuery } from '@/lib/features/teamApi';
import { Flex } from '@chakra-ui/react';
import React from 'react';
import TeamCard from './TeamCard';

interface Props {
    user_id: string;
}

const TeamsGrid = ({ user_id }: Props) => {
    const { data, error, isLoading } = useGetTeamsByUserIdQuery(user_id);

    if (error) handleErrors(error, getTeamsError.type);

    const teams = convertToTeamList(data);

    return (
        <>
            {!isLoading ?
                <TeamsGridLoading />
                :
                <Flex className='gap-2 flex-wrap'>
                    {teams.map(team => (
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
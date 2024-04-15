import { convertToTeamList } from '@/components/utils';
import { useGetTeamsByUserIdQuery } from '@/lib/features/teamApi';
import TeamCard from './TeamCard';
import React from 'react';
import { Flex } from '@chakra-ui/react';

interface Props {
    user_id: string;
}

const TeamsGrid = ({ user_id }: Props) => {
    const { data } = useGetTeamsByUserIdQuery(user_id);

    const teams = convertToTeamList(data);

    return (
        <Flex className='gap-2 flex-wrap'>
            {teams.map(team => (
                <React.Fragment key={team.id}>
                    <TeamCard teams={team} />
                </React.Fragment>
            ))}
        </Flex>
    )
}

export default TeamsGrid
"use client"
import TeamInfoLoading from '@/components/loading/TeamInfoLoading';
import { handleErrors } from '@/components/utils/handleErrors';
import { getTeamsError } from '@/constants';
import { useGetTeamByIdQuery } from '@/lib/features/teamApi';
import { Flex } from '@chakra-ui/react';
import ManageMembers from './ManageMembers';
import TeamDetailsHeading from './TeamDetailsHeading';
import TeamInfo from './TeamInfo';

const TeamDetails = ({ team_id }: { team_id: string }) => {
    const { data: team, error, isLoading } = useGetTeamByIdQuery(team_id);

    if (error) handleErrors(error, getTeamsError.type);

    if (!team) return null;

    return (
        <Flex className='flex-col w-full h-full'>
            <TeamDetailsHeading name={team.name} />
            {isLoading ? <TeamInfoLoading />
                :
                <Flex className='flex-col gap-3 p-5 flex-[1_0_0] overflow-scroll'>
                    <TeamInfo name={team.name} desc={team.desc} />
                    <ManageMembers team={team} />
                </Flex>
            }
        </Flex>
    )
}

export default TeamDetails
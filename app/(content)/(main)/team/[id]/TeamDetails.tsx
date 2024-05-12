import TeamInfoLoading from '@/components/loading/TeamInfoLoading';
import { handleErrors } from '@/components/utils/handleErrors';
import { getTeamsError } from '@/constants';
import { useGetTeamByIdQuery } from '@/lib/features/teamApi';
import { Link } from '@chakra-ui/next-js';
import { Flex, Icon, Text } from '@chakra-ui/react';
import { FaCaretRight } from "react-icons/fa6";
import TeamHeading from '../TeamHeading';
import ManageMembers from './ManageMembers';
import TeamInfo from './TeamInfo';

interface Props {
    team_id: string;
}

const TeamDetails = ({ team_id }: Props) => {
    const { data: team, error, isLoading } = useGetTeamByIdQuery(team_id);

    if (error) handleErrors(error, getTeamsError.type);

    if (!team) return null;

    return (
        <Flex className='flex-col w-full h-full'>
            <TeamHeading>
                <Flex className='gap-3 items-center'>
                    <Link href="/team">All Teams</Link>
                    <Icon as={FaCaretRight} w={5} h={5} />
                    <Text>{team.name}</Text>
                </Flex>
            </TeamHeading>
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
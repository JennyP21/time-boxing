import { useGetTeamByIdQuery } from '@/lib/features/teamApi';
import { Link } from '@chakra-ui/next-js';
import { Flex, Heading, Icon, Text } from '@chakra-ui/react';
import { FaCaretRight } from "react-icons/fa6";
import TeamHeading from '../TeamHeading';
import ManageMembers from './ManageMembers';

interface Props {
    team_id: string;
}

const TeamDetails = ({ team_id }: Props) => {
    const { data: team } = useGetTeamByIdQuery(team_id);

    return (
        <>
            <TeamHeading>
                <Flex className='gap-3 items-center'>
                    <Link href="/team">All Teams</Link>
                    <Icon as={FaCaretRight} w={5} h={5} />
                    <Text>{team?.name}</Text>
                </Flex>
            </TeamHeading>
            <Flex className='flex-col gap-3 p-5'>
                <Heading size="md">Name: {team?.name}</Heading>
                <Text>Description: {team?.desc}</Text>
                <ManageMembers team_id={team_id} />
            </Flex>
        </>
    )
}

export default TeamDetails
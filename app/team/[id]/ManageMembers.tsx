import { convertToCustomMembersList } from '@/components/utils';
import { useGetTeamMembersQuery } from '@/lib/features/teamApi';
import { Flex } from '@chakra-ui/react';
import AccordionTeamUserList from './AccordionTeamUserList';
import AddMember from './AddMember';

interface Props {
    team_id: string;
}

const ManageMembers = ({ team_id }: Props) => {
    const { data } = useGetTeamMembersQuery(team_id);
    const users = convertToCustomMembersList(data);

    const owners = users.filter(user => user.role === "owner");
    const members = users.filter(user => user.role === "member");

    return (
        <Flex className='flex-col gap-3'>
            <AddMember team_id={team_id} />
            <AccordionTeamUserList label='Owners' list={owners} />
            <AccordionTeamUserList label='Members' list={members} />
        </Flex >
    )
}

export default ManageMembers
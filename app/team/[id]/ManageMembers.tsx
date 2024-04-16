import { convertToTeamMembersList } from '@/components/utils';
import { useGetTeamMembersQuery } from '@/lib/features/teamApi';
import { List, ListItem } from '@chakra-ui/react';

interface Props {
    team_id: string;
}

const ManageMembers = ({ team_id }: Props) => {
    const { data } = useGetTeamMembersQuery(team_id);
    const members = convertToTeamMembersList(data);

    return (
        <List>
            {members && members.map(member => (
                <ListItem key={member.id}>{member.user_id} {member.role}</ListItem>
            ))}
        </List>
    )
}

export default ManageMembers
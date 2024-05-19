import { useGetTeamMembersQuery } from '@/lib/features/teamApi';
import { convertToCustomMembersList } from '../utils';
import AssignUser from './AssignUser';

interface Props {
    team_id: string;
    task_id: string;
}

const TeamUsers = ({ team_id, task_id }: Props) => {
    const { data } = useGetTeamMembersQuery(team_id);
    if (!data) return null;
    const users = convertToCustomMembersList(data);

    return (
        <AssignUser users={users} task_id={task_id} />
    )
}

export default TeamUsers
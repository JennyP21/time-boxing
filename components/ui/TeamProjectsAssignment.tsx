import { useGetTeamMembersQuery } from '@/lib/features/teamApi';
import AssignUserContainer from './AssignUserContainer';
import { UserI } from '@/interfaces';

interface Props {
    team_id: string;
    task_id: string;
    assignedUsers: UserI[];
}

const TeamProjectsAssignment = ({ team_id, task_id, assignedUsers }: Props) => {
    const { data } = useGetTeamMembersQuery(team_id);
    if (!data) return null;

    return (
        <AssignUserContainer users={data.users} task_id={task_id} assignedUsers={assignedUsers} />
    )
}

export default TeamProjectsAssignment
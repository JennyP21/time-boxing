import { useGetTeamMembersQuery } from '@/lib/features/teamApi';
import AssignUserContainer from './AssignUserContainer';

interface Props {
    team_id: string;
    task_id: string;
}

const TeamProjectsAssignment = ({ team_id, task_id }: Props) => {
    const { data } = useGetTeamMembersQuery(team_id);
    if (!data) return null;

    return (
        <AssignUserContainer users={data.users} task_id={task_id} />
    )
}

export default TeamProjectsAssignment
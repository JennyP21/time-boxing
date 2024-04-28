import { getProjectError } from '@/constants';
import { UserI } from '@/interfaces';
import { useGetProjectQuery } from '@/lib/features/projectApi';
import { useGetTeamMembersQuery } from '@/lib/features/teamApi';
import { useSession } from 'next-auth/react';
import { convertToCustomMembersList } from '../utils';
import { handleErrors } from '../utils/handleErrors';
import AssignUser from './AssignUser';

interface Props {
    project_id: string;
    task_id: string;
}

const AssignUserContainer = ({ project_id, task_id }: Props) => {

    const { data: projects, error } = useGetProjectQuery(project_id);

    if (error) handleErrors(error, getProjectError.type);

    if (!projects) return null;

    const { team_id } = projects;
    if (team_id) {
        const { data } = useGetTeamMembersQuery(team_id);
        if (!data) return null;
        const users = convertToCustomMembersList(data);
        return (
            <AssignUser users={users} task_id={task_id} />
        )
    }

    const { data } = useSession();
    if (!data) return null;
    const users = [{
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        image: data.user.image
    }] as UserI[];

    return (
        <AssignUser users={users} task_id={task_id} />
    )
}

export default AssignUserContainer
import { getProjectError } from '@/constants';
import { useGetProjectQuery } from '@/lib/features/projectApi';
import { handleErrors } from '../utils/handleErrors';
import PersonalProjectsAssignment from './PersonalProjectsAssignment';
import TeamProjectsAssignment from './TeamProjectsAssignment';

interface Props {
    project_id: string;
    task_id: string;
}

const UserAssignmentContainer = ({ project_id, task_id }: Props) => {
    const { data: project, error } = useGetProjectQuery(project_id);
    if (error) handleErrors(error, getProjectError.type);
    if (!project) return null;

    return (
        <>
            {project.team_id ?
                <TeamProjectsAssignment team_id={project.team_id} task_id={task_id} />
                :
                <PersonalProjectsAssignment task_id={task_id} />
            }
        </>
    )
}

export default UserAssignmentContainer
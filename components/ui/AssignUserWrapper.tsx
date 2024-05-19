import { getProjectError } from '@/constants';
import { useGetProjectQuery } from '@/lib/features/projectApi';
import { handleErrors } from '../utils/handleErrors';
import PersonalUsers from './PersonalUsers';
import TeamUsers from './TeamUsers';

interface Props {
    project_id: string;
    task_id: string;
}

const AssignUserWrapper = ({ project_id, task_id }: Props) => {
    const { data: project, error } = useGetProjectQuery(project_id);
    if (error) handleErrors(error, getProjectError.type);
    if (!project) return null;

    return (
        <>
            {project.team_id ?
                <TeamUsers team_id={project.team_id} task_id={task_id} />
                :
                <PersonalUsers task_id={task_id} />
            }
        </>
    )
}

export default AssignUserWrapper
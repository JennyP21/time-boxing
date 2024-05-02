import { handleErrors } from '@/components/utils/handleErrors';
import { getProjectError, getTeamsError } from '@/constants';
import { useGetProjectsByUserIdQuery } from '@/lib/features/projectApi';
import { useGetTeamsByUserIdQuery } from '@/lib/features/teamApi';
import Projects from './Projects';
import TeamProjectsWrapper from './TeamProjectsWrapper';

interface Props {
    user_id: string;
}

const ProjectGrid = ({ user_id }: Props) => {
    const { data: personalProjects, error: projectsGetError } = useGetProjectsByUserIdQuery(user_id);
    if (projectsGetError) handleErrors(projectsGetError, getProjectError.type);

    const { data: teams, error: teamsGetError } = useGetTeamsByUserIdQuery(user_id);
    if (teamsGetError) handleErrors(teamsGetError, getTeamsError.type);

    return (
        <>
            {personalProjects && <Projects title="Personal" projects={personalProjects} />}
            {teams && <TeamProjectsWrapper teams={teams} />}
        </>
    )
}

export default ProjectGrid
import ProjectContainerLoading from '@/components/loading/ProjectContainerLoading';
import { handleErrors } from '@/components/utils/handleErrors';
import { getProjectError, getTeamsError } from '@/constants';
import { useGetProjectsByUserIdQuery } from '@/lib/features/projectApi';
import { useGetTeamsByUserIdQuery } from '@/lib/features/teamApi';
import { Box } from '@chakra-ui/react';
import AddOrUpdateProjectContainer from '../AddOrUpdateProjectContainer';
import Projects from './Projects';
import TeamProjectsWrapper from './TeamProjectsWrapper';

interface Props {
    user_id: string;
}

const ProjectGrid = ({ user_id }: Props) => {
    const { data: personalProjects, error: projectsGetError, isLoading: isPLoading } = useGetProjectsByUserIdQuery(user_id);
    if (projectsGetError) handleErrors(projectsGetError, getProjectError.type);

    const { data: teams, error: teamsGetError, isLoading: isTLoading } = useGetTeamsByUserIdQuery(user_id);
    if (teamsGetError) handleErrors(teamsGetError, getTeamsError.type);

    return (
        <>
            <Box className='w-40 mb-5'>
                <AddOrUpdateProjectContainer user_id={user_id} />
            </Box>
            {isPLoading ? <ProjectContainerLoading /> : (
                personalProjects && <Projects title="Personal" projects={personalProjects} />
            )}
            {isTLoading ? <ProjectContainerLoading /> : (
                teams && <TeamProjectsWrapper teams={teams} />
            )}
        </>
    )
}

export default ProjectGrid
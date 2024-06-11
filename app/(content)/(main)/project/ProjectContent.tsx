import ProjectContainerLoading from '@/components/loading/ProjectContainerLoading';
import { handleErrors } from '@/components/utils/handleErrors';
import { getTeamsError } from '@/constants';
import { useGetTeamsByUserIdQuery } from '@/lib/features/teamApi';
import { Box } from '@chakra-ui/react';
import AddProjectContainer from '../AddProjectContainer';
import PersonalProjectContainer from './PersonalProjectContainer';
import TeamProjectsContainer from './TeamProjectsContainer';

const ProjectContent = ({ user_id }: { user_id: string }) => {
    const { data: teams, error, isLoading } = useGetTeamsByUserIdQuery(user_id);
    if (error) handleErrors(error, getTeamsError.type);

    return (
        <>
            <Box className='w-40'>
                <AddProjectContainer user_id={user_id} />
            </Box>
            <PersonalProjectContainer user_id={user_id} />
            {isLoading ? <ProjectContainerLoading /> : (
                teams && <TeamProjectsContainer teams={teams} user_id={user_id} />
            )}
        </>
    )
}

export default ProjectContent
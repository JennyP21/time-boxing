import ProjectContainerLoading from '@/components/loading/ProjectContainerLoading';
import { handleErrors } from '@/components/utils/handleErrors';
import { getProjectError } from '@/constants';
import { useGetProjectsByUserIdQuery } from '@/lib/features/projectApi';
import Projects from './Projects';

const PersonalProjectContainer = ({ user_id }: { user_id: string }) => {
    const { data: projects, error, isLoading } = useGetProjectsByUserIdQuery(user_id);
    if (error) handleErrors(error, getProjectError.type);

    return (
        <>
            {isLoading ? <ProjectContainerLoading /> : (
                projects && <Projects title="Personal" projects={projects} />
            )}
        </>
    )
}

export default PersonalProjectContainer
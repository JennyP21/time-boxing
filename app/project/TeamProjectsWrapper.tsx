import { TeamI } from '@/interfaces';
import { useGetProjectsByTeamIdsQuery } from '@/lib/features/projectApi';
import Projects from './Projects';
import { handleErrors } from '@/components/utils/handleErrors';
import { getProjectError } from '@/constants';

interface Props {
    teams: TeamI[]
}

const TeamProjectsWrapper = ({ teams }: Props) => {
    const { data: projects, error } = useGetProjectsByTeamIdsQuery(teams.map(team => team.id));
    if (error) handleErrors(error, getProjectError.type);

    return (
        <>
            {projects && <Projects title='Team Projects' projects={projects} />}
        </>
    )
}

export default TeamProjectsWrapper
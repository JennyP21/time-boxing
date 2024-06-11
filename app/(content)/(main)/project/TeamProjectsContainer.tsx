import { handleErrors } from '@/components/utils/handleErrors';
import { getProjectError } from '@/constants';
import { TeamI } from '@/interfaces';
import { useGetProjectsByTeamIdsQuery } from '@/lib/features/projectApi';
import Projects from './Projects';

interface Props {
    user_id: string;
    teams: TeamI[];
}

const TeamProjectsContainer = ({ teams, user_id }: Props) => {
    const { data: projects, error } = useGetProjectsByTeamIdsQuery(teams.map(team => team.id));
    if (error) handleErrors(error, getProjectError.type);

    return (
        <>
            {projects && <Projects title='Team Projects' projects={projects} user_id={user_id} />}
        </>
    )
}

export default TeamProjectsContainer
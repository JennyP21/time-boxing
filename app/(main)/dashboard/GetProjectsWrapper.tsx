import { handleErrors } from "@/components/utils/handleErrors";
import { getProjectError } from "@/constants";
import { ProjectI, TeamI } from "@/interfaces";
import { useGetProjectsByTeamIdsQuery } from "@/lib/features/projectApi";
import GetTasksWrapper from "./GetTasksWrapper";

interface Props {
    personalProjects: ProjectI[] | undefined;
    teams: TeamI[] | undefined;
}

const GetProjectsWrapper = ({ personalProjects, teams }: Props) => {
    const { data: teamProjects, error } = useGetProjectsByTeamIdsQuery(teams ? teams.map(team => team.id) : []);
    if (error) handleErrors(error, getProjectError.type);

    let allProjects: ProjectI[] = [];
    personalProjects?.map(project => allProjects.push(project));
    teamProjects?.map(project => allProjects.push(project));

    return (
        <GetTasksWrapper allProjects={allProjects} />
    )
}

export default GetProjectsWrapper
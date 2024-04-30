"use client"
import { handleErrors } from '@/components/utils/handleErrors';
import { getIsExpanded } from '@/components/utils/handleUserState';
import { getProjectError } from '@/constants';
import { TeamContainerI } from '@/interfaces';
import { useGetProjectsByTeamIdQuery } from '@/lib/features/projectApi';
import { Link } from '@chakra-ui/next-js';
import { List, ListItem, Spinner } from '@chakra-ui/react';
import LeftPanelAccordion from './LeftPanelAccordion';

const TeamList = ({ teams: team }: TeamContainerI) => {
    const { data: projects, error, isLoading } = useGetProjectsByTeamIdQuery(team.id);

    if (error) handleErrors(error, getProjectError.type);

    const name = team.id;
    const currState = getIsExpanded(name) === 'true';

    return (
        <LeftPanelAccordion title={team.name} link={`/team/${team.id}`} isExpanded={currState} expandData={{ name, currState }}>
            {isLoading ? <Spinner /> : <List>
                {projects?.map((project) => (
                    <ListItem key={project.id} className='px-1 rounded-lg cursor-pointer' _hover={{ bg: "gray.100" }}>
                        <Link href={`/project/${project.id}`} _hover={{ textDecor: "none" }} whiteSpace="nowrap">
                            {project.name}
                        </Link>
                    </ListItem>
                ))}
            </List>}
        </LeftPanelAccordion>
    )
}

export default TeamList
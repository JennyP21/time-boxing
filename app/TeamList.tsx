"use client"
import AddProject from '@/components/ui/AddProject';
import { PropsWithTeamI } from '@/interfaces';
import { useGetProjectsByTeamIdQuery } from '@/lib/features/projectApi';
import { Link } from '@chakra-ui/next-js';
import { List, ListItem } from '@chakra-ui/react';
import LeftPanelAccordion from './LeftPanelAccordion';

const TeamList = ({ teams: team }: PropsWithTeamI) => {
    const { data: projects } = useGetProjectsByTeamIdQuery(team.id);

    return (
        <LeftPanelAccordion title={team.name} link={`/team/${team.id}`}>
            <List>
                {projects?.map((project) => (
                    <ListItem key={project.id} className='px-1 rounded-lg cursor-pointer' _hover={{ bg: "gray.100" }}>
                        <Link href={`/project/${project.id}`} _hover={{ textDecor: "none" }} whiteSpace="nowrap">
                            {project.name}
                        </Link>
                    </ListItem>
                ))}
                <AddProject team_id={team.id} />
            </List>
        </LeftPanelAccordion>
    )
}

export default TeamList
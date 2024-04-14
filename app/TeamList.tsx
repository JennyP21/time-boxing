"use client"
import { PropsWithTeamI } from '@/interfaces';
import { useGetProjectsQuery } from '@/lib/features/projectApi';
import { Link, List, ListItem } from '@chakra-ui/react';
import LeftPanelAccordion from './LeftPanelAccordion';

const TeamList = ({ teams: team }: PropsWithTeamI) => {
    const { data: projects } = useGetProjectsQuery();

    return (
        <LeftPanelAccordion title={team.name}>
            <List>
                {projects?.map((project) => (
                    <ListItem key={project.id} className='px-1 rounded-lg cursor-pointer' _hover={{ bg: "gray.100" }}>
                        <Link href={`/project/${project.id}`} _hover={{ textDecor: "none" }} whiteSpace="nowrap">
                            {project.name}
                        </Link>
                    </ListItem>
                ))}
            </List>
        </LeftPanelAccordion>
    )
}

export default TeamList
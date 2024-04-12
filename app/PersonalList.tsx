"use client"
import { List, ListItem } from '@chakra-ui/react';
import LeftPanelAccordion from './LeftPanelAccordion';
import { useGetProjectsQuery } from '@/lib/features/projectApi';

const PersonalList = () => {
    const { data: projects } = useGetProjectsQuery();

    return (
        <LeftPanelAccordion title='Personal'>
            <List spacing={1}>
                {projects?.map((project) => (
                    <ListItem key={project.id} className='px-1 rounded-lg' _hover={{ bg: "gray.100" }}>{project.name}</ListItem>
                ))}
                <ListItem>Add new project</ListItem>
            </List>
        </LeftPanelAccordion>
    )
}

export default PersonalList
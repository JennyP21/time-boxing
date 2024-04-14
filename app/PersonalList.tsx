"use client"
import AddProject from '@/components/ui/AddProject';
import { useGetProjectsQuery } from '@/lib/features/projectApi';
import { Link, List, ListItem } from '@chakra-ui/react';
import LeftPanelAccordion from './LeftPanelAccordion';

const PersonalList = () => {
    const { data: projects } = useGetProjectsQuery();

    return (
        <LeftPanelAccordion title='Personal plans'>
            <List>
                {projects?.map((project) => (
                    <ListItem key={project.id} className='px-1 rounded-lg cursor-pointer' _hover={{ bg: "gray.100" }}>
                        <Link href={`/project/${project.id}`} _hover={{ textDecor: "none" }}>
                            {project.name}
                        </Link>
                    </ListItem>
                ))}
                <AddProject />
            </List>
        </LeftPanelAccordion>
    )
}

export default PersonalList
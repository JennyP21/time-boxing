"use client"
import { useGetProjectsByUserIdQuery } from '@/lib/features/projectApi';
import { Link } from '@chakra-ui/next-js';
import { List, ListItem } from '@chakra-ui/react';
import LeftPanelAccordion from './LeftPanelAccordion';

interface Props {
    user_id: string;
}

const PersonalList = ({ user_id }: Props) => {
    const { data: projects } = useGetProjectsByUserIdQuery(user_id);

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
            </List>
        </LeftPanelAccordion>
    )
}

export default PersonalList
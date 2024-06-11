import { ProjectI } from '@/interfaces';
import { Flex } from '@chakra-ui/react';
import ProjectCard from './ProjectCard';

interface Props {
    projects: ProjectI[];
    user_id: string;
}

const ProjectGrid = ({ projects, user_id }: Props) => {
    return (
        <Flex className='gap-1.5 py-2 px-1 flex-wrap'>
            {projects.map(project => (
                <ProjectCard key={project.id} project={project} user_id={user_id} />
            ))}
        </Flex>
    )
}

export default ProjectGrid
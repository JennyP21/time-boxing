import { ProjectI } from '@/interfaces';
import { Box, Flex, Heading } from '@chakra-ui/react';
import ProjectCard from './ProjectCard';

interface Props {
    title: string;
    projects: ProjectI[];
}

const Projects = ({ title, projects }: Props) => {
    return (
        <Box className='mb-5 p-1 shadow-inner rounded-xl' borderBottom="2px" borderColor="gray.200">
            <Heading as="h4" size="md">{title}</Heading>
            <Flex className='gap-1.5 py-2 px-1 flex-wrap'>
                {projects.map(project => (
                    <ProjectCard project={project} key={project.id} />
                ))}
            </Flex>
        </Box>
    )
}

export default Projects
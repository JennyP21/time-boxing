import { ProjectI, ViewType } from '@/interfaces';
import { Box, Flex, Heading, Icon } from '@chakra-ui/react';
import { useState } from 'react';
import { IoGridOutline, IoListOutline } from 'react-icons/io5';
import ProjectGrid from './ProjectGrid';
import ProjectTable from './ProjectTable';

interface Props {
    title: string;
    projects: ProjectI[];
    user_id: string;
}

const Projects = ({ title, projects, user_id }: Props) => {
    const [view, setView] = useState<ViewType>("Grid");

    return (
        <Box className='p-1 rounded-xl'>
            <Flex className='justify-between border-b border-gray-300 mb-3 py-3'>
                <Heading as="h4" size="md">{title}</Heading>
                <Flex className='gap-3 justify-center items-center mx-3'>
                    <Icon
                        className='p-0.5 cursor-pointer'
                        bg={view === "Grid" ? "gray.200" : ""}
                        _hover={{ bg: "gray.300" }}
                        as={IoGridOutline}
                        w={5}
                        h={5}
                        onClick={view === "List" ? () => setView("Grid") : undefined}
                    />
                    <Icon
                        className='cursor-pointer'
                        bg={view === "List" ? "gray.200" : ""}
                        _hover={{ bg: "gray.300" }}
                        as={IoListOutline}
                        w={5}
                        h={5}
                        onClick={view === "Grid" ? () => setView("List") : undefined}
                    />
                </Flex>
            </Flex>
            {view === "Grid" ?
                <ProjectGrid projects={projects} user_id={user_id} />
                :
                <ProjectTable projects={projects} user_id={user_id} />
            }
        </Box>
    )
}

export default Projects
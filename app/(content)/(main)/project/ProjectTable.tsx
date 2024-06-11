import { ProjectI } from '@/interfaces';
import { Table, TableContainer, Text } from '@chakra-ui/react';
import ProjectTableBody from './ProjectTableBody';
import ProjectTableHead from './ProjectTableHead';

interface Props {
    user_id: string;
    projects: ProjectI[];
}

const ProjectTable = ({ projects, user_id }: Props) => {
    return (
        <>
            {projects.length > 0 ?
                <TableContainer>
                    <Table className='bg-gray-50' size={{ base: "sm", md: "md" }}>
                        <ProjectTableHead />
                        <ProjectTableBody projects={projects} user_id={user_id} />
                    </Table>
                </TableContainer>
                :
                <Text>No projects found</Text>
            }
        </>
    )
}

export default ProjectTable
import { formatDate } from '@/components/utils'
import { ProjectI } from '@/interfaces'
import { Tbody, Td, Tr } from '@chakra-ui/react'
import Link from 'next/link'
import UpdateProjectContainer from '../UpdateProjectContainer'
import DeleteProject from './DeleteProject'

interface Props {
    projects: ProjectI[];
    user_id: string;
}

const ProjectTableBody = ({ projects, user_id }: Props) => {
    return (
        <Tbody>
            {projects.map(project => (
                <Tr key={project.id} className='hover:bg-gray-100'>
                    <Td>
                        <Link href={`/project/${project.id}`}>
                            {project.name}
                        </Link>
                    </Td>
                    <Td className='max-sm:hidden'>{formatDate(project.created_at)}</Td>
                    <Td className='max-sm:hidden'>{formatDate(project.updated_at)}</Td>
                    <Td>
                        <DeleteProject project={project} />
                    </Td>
                    <Td>
                        <UpdateProjectContainer user_id={user_id} currentProject={project} />
                    </Td>
                </Tr>
            ))}
        </Tbody>
    )
}

export default ProjectTableBody
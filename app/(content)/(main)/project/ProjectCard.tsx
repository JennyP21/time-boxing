import { formatDate } from '@/components/utils'
import { ProjectI } from '@/interfaces'
import { Link } from '@chakra-ui/next-js'
import { Card, CardHeader, Heading, CardBody, Text, CardFooter, Flex } from '@chakra-ui/react'
import React from 'react'
import DeleteProject from './DeleteProject'
import UpdateProjectContainer from '../UpdateProjectContainer'

interface Props {
    project: ProjectI;
    user_id: string;
}

const ProjectCard = ({ project, user_id }: Props) => {
    return (
        <Card className='shadow-md hover:shadow-lg' border="1px" borderColor="gray.100" maxW="15rem" minW="15rem" _hover={{
            scale: 1.1,
        }}>
            <CardHeader pb={1} position="relative">
                <Heading size='md'>
                    <Link href={`/project/${project.id}`}>
                        {project.name}
                    </Link>
                </Heading>
            </CardHeader>
            <CardBody>
                <Text fontSize="small">Created on {formatDate(project.created_at)}</Text>
                <Text fontSize="small">Last Modified {formatDate(project.updated_at)}</Text>
            </CardBody>
            <CardFooter pt={1}>
                <Flex className='gap-3 justify-center items-center'>
                    <UpdateProjectContainer user_id={user_id} currentProject={project} />
                    <DeleteProject project={project} />
                </Flex>
            </CardFooter>
        </Card>
    )
}

export default ProjectCard
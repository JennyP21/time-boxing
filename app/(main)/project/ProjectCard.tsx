import { formatDate } from '@/components/utils';
import { ProjectI } from '@/interfaces';
import { Link } from '@chakra-ui/next-js';
import { Card, CardBody, CardHeader, Heading, Text } from '@chakra-ui/react';

interface Props {
    project: ProjectI;
}

const ProjectCard = ({ project }: Props) => {
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
        </Card>
    )
}

export default ProjectCard
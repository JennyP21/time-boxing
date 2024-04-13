import GroupBySelector from '@/app/kanban/GroupBySelector';
import { ProjectI } from '@/interfaces';
import { HStack, Heading } from '@chakra-ui/react';

interface Props {
    project: ProjectI;
}

const ProjectHeader = ({ project }: Props) => {
    return (
        <HStack className='w-full justify-between' borderBottom="1px" p={1} borderColor={"gray.300"}>
            <Heading size="lg" as={"h3"} fontWeight="normal">{project.name}</Heading>
            <HStack>
                <GroupBySelector />
            </HStack>
        </HStack>
    )
}

export default ProjectHeader
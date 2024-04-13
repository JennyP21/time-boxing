import GroupBySelector from '@/app/kanban/GroupBySelector';
import { ProjectI, TabI } from '@/interfaces';
import { HStack, Heading } from '@chakra-ui/react';
import ViewTabs from './ViewTabs';

interface Props {
    project: ProjectI;
    tabs: TabI[];
    setTabs: (value: TabI[]) => void;
}

const ProjectHeader = ({ project, tabs, setTabs }: Props) => {
    return (
        <HStack className='w-full justify-between' borderBottom="1px" p={1} borderColor={"gray.300"}>
            <Heading size="lg" as={"h3"} fontWeight="normal">{project.name}</Heading>
            <HStack>
                <GroupBySelector />
                <ViewTabs tabs={tabs} setTabs={setTabs} />
            </HStack>
        </HStack>
    )
}

export default ProjectHeader
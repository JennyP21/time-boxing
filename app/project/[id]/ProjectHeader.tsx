import GroupBySelector from '@/components/ui/Kanban/GroupBySelector';
import { ProjectI, TabI } from '@/interfaces';
import { HStack, Heading } from '@chakra-ui/react';
import ViewTabs from './ViewTabs';
import ListByStatus from '@/components/ui/List/ListByStatus';

interface Props {
    project: ProjectI;
    tabs: TabI[];
    setTabs: (value: TabI[]) => void;
}

const ProjectHeader = ({ project, tabs, setTabs }: Props) => {
    const activeTab = tabs.find(tab => tab.active)!;

    return (
        <HStack className='w-full justify-between' borderBottom="1px" p={1} borderColor={"gray.300"}>
            <Heading size="lg" as={"h3"} fontWeight="normal">{project.name}</Heading>
            <HStack>
                {activeTab.name === "List" ?
                    <ListByStatus />
                    :
                    <GroupBySelector />
                }
                <ViewTabs tabs={tabs} setTabs={setTabs} />
            </HStack>
        </HStack>
    )
}

export default ProjectHeader
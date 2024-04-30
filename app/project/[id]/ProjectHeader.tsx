import AddOrUpdateProjectContainer from '@/app/AddOrUpdateProjectContainer';
import GroupBySelector from '@/components/ui/Kanban/GroupBySelector';
import ListByStatus from '@/components/ui/List/ListByStatus';
import { getView } from '@/components/utils/handleUserState';
import { ProjectI, TabI } from '@/interfaces';
import { Flex, HStack, Heading } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import ViewTabs from './ViewTabs';
import LabelEditor from './LabelEditor';

interface Props {
    project: ProjectI;
    tabs: TabI[];
    setTabs: (value: TabI[]) => void;
}

const ProjectHeader = ({ project, tabs, setTabs }: Props) => {
    const session = useSession();
    const currentView = getView(project.id) || "List";

    return (
        <HStack className='w-full justify-between' borderBottom="1px" p={1} borderColor={"gray.300"}>
            <Flex className='gap-2'>
                <Heading size="lg" as={"h3"} fontWeight="normal">
                    {project.name}
                </Heading>
                {session.data && <AddOrUpdateProjectContainer user_id={session.data.user.id} currentProject={project} />}
            </Flex>
            <HStack>
                <LabelEditor project_id={project.id} />
                {currentView === "List" ?
                    <ListByStatus />
                    :
                    <GroupBySelector />
                }
                <ViewTabs tabs={tabs} setTabs={setTabs} currentTab={currentView} project_id={project.id} />
            </HStack>
        </HStack>
    )
}

export default ProjectHeader
import GroupBySelector from '@/components/ui/Kanban/GroupBySelector';
import ListByStatus from '@/components/ui/List/ListByStatus';
import { getView } from '@/components/utils/handleUserState';
import { PROJECT_VIEW_TYPE } from '@/constants';
import { ProjectI, TabI } from '@/interfaces';
import { Link } from '@chakra-ui/next-js';
import { Flex, Heading, HStack, Icon, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { FaCaretRight } from 'react-icons/fa';
import UpdateProjectContainer from '../../UpdateProjectContainer';
import LabelManager from './LabelManager';
import ViewTabs from './ViewTabs';

interface Props {
    project: ProjectI;
    tabs: TabI[];
    setTabs: (value: TabI[]) => void;
}

const ProjectHeader = ({ project, tabs, setTabs }: Props) => {
    const session = useSession();
    const currentView = getView(project.id) || PROJECT_VIEW_TYPE;

    return (
        <HStack className='w-full justify-between' borderBottom="1px" p={1} borderColor={"gray.300"}>
            <Flex className='gap-2'>
                <Heading className='max-w-[40rem] whitespace-nowrap overflow-clip p-0.5' size="lg" as={"h4"} fontWeight="normal">
                    {project.name}
                </Heading>
                {session.data && <UpdateProjectContainer user_id={session.data.user.id} currentProject={project} />}
            </Flex>
            <HStack>
                <LabelManager project_id={project.id} />
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
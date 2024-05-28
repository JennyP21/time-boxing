import GroupBySelector from '@/components/ui/Kanban/GroupBySelector';
import ListByStatus from '@/components/ui/List/ListByStatus';
import { getView } from '@/components/utils/handleUserState';
import { PROJECT_VIEW_TYPE } from '@/constants';
import { ProjectI, TabI } from '@/interfaces';
import { Link } from '@chakra-ui/next-js';
import { Flex, Heading, HStack, Icon, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { FaCaretRight } from 'react-icons/fa';
import AddOrUpdateProjectContainer from '../../AddOrUpdateProjectContainer';
import LabelCreator from './LabelManager';
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
                <Flex className='gap-3 items-center'>
                    <Heading size="lg" as={"h3"} fontWeight="normal">
                        <Link href="/project">All Projects</Link>
                    </Heading>
                    <Icon as={FaCaretRight} w={5} h={5} />
                    <Heading size="lg" as={"h3"} fontWeight="normal">
                        <Text>{project.name}</Text>
                    </Heading>
                </Flex>
                {session.data && <AddOrUpdateProjectContainer user_id={session.data.user.id} currentProject={project} />}
            </Flex>
            <HStack>
                <LabelCreator project_id={project.id} />
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
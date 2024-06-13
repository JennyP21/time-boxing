import GroupBySelector from '@/components/ui/Kanban/GroupBySelector';
import ListByStatus from '@/components/ui/List/ListByStatus';
import { getView } from '@/components/utils/handleUserState';
import { PROJECT_VIEW_TYPE } from '@/constants';
import { ProjectI, TabI } from '@/interfaces';
import { Flex, Grid, Heading, HStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
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
        <Grid
            className='w-full justify-between gap-2'
            templateRows={{
                base: "1fr 1fr",
                lg: "1fr"
            }}
            templateColumns={{
                base: "1fr",
                lg: "1fr 1fr"
            }}
            borderBottom="1px"
            p={1}
            borderColor={"gray.300"}
        >
            <HStack className='w-full gap-2'>
                <Heading className='lg:max-w-[40rem] whitespace-nowrap overflow-clip p-0.5 font-bold' size={{ base: "sm", sm: "md", lg: "lg" }} as={"h4"} fontWeight="normal">
                    {project.name}
                </Heading>
                {session.data && <UpdateProjectContainer user_id={session.data.user.id} currentProject={project} />}
            </HStack>
            <HStack className='max-lg:justify-between lg:justify-self-end'>
                <Flex className='gap-1 sm:gap-3'>
                    <LabelManager project_id={project.id} />
                    {currentView === "List" ?
                        <ListByStatus />
                        :
                        <GroupBySelector />
                    }
                </Flex>
                <ViewTabs tabs={tabs} setTabs={setTabs} currentTab={currentView} project_id={project.id} />
            </HStack>
        </Grid>
    )
}

export default ProjectHeader
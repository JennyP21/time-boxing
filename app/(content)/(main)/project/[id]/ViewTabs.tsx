import { setView } from '@/components/utils/handleUserState';
import { TabI } from '@/interfaces';
import { Flex, HStack, Icon, StackItem } from '@chakra-ui/react';

interface Props {
    tabs: TabI[];
    setTabs: (value: TabI[]) => void;
    currentTab: string;
    project_id: string;
}

const ViewTabs = ({ tabs, setTabs, currentTab, project_id }: Props) => {

    const changeActiveTabs = (selectedTab: TabI) => {
        const currActive = tabs.filter(tab => tab.name === currentTab)[0];
        const setActiveTab = tabs.filter(tab => tab.name === selectedTab.name)[0];

        if (currActive.name !== setActiveTab.name) {
            const newTabs = tabs.map(tab =>
                tab.name === setActiveTab.name ?
                    { ...tab, active: true }
                    :
                    { ...tab, active: false }
            )
            setTabs(newTabs);
            setView(project_id, setActiveTab.name);
        }
    }

    return (
        <Flex className='mx-1 sm:mx-2 gap-1 sm:gap-2 justify-center items-center'>
            {tabs.map(tab => (
                <StackItem
                    key={tab.name}
                    className='cursor-pointer'
                    onClick={() => changeActiveTabs(tab)}
                >
                    <Icon bg={currentTab == tab.name ? "blue.200" : ""} as={tab.icon} w={6} h={6} />
                </StackItem>
            ))}
        </Flex>
    )
}

export default ViewTabs
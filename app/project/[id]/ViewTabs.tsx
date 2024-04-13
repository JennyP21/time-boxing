import { TabI } from '@/interfaces';
import { HStack, StackItem } from '@chakra-ui/react';

interface Props {
    tabs: TabI[];
    setTabs: (value: TabI[]) => void;
}

const ViewTabs = ({ tabs, setTabs }: Props) => {

    const changeActiveTabs = (selectedTab: TabI) => {
        const currActive = tabs.filter(tab => tab.active === true)[0];
        const setActiveTab = tabs.filter(tab => tab.name === selectedTab.name)[0];

        if (currActive.name !== setActiveTab.name) {
            const newTabs = tabs.map(tab =>
                tab.name === setActiveTab.name ?
                    { ...tab, active: true }
                    :
                    { ...tab, active: false }
            )
            setTabs(newTabs);
        }
    }

    return (
        <HStack className='border-y border-gray-300 mx-4'>
            {tabs.map(tab => (
                <StackItem
                    key={tab.name}
                    className='cursor-pointer text-lg'
                    fontWeight={tab.active ? "semibold" : "normal"}
                    _hover={{ bg: "gray.100" }}
                    onClick={() => changeActiveTabs(tab)}
                >
                    {tab.name}
                </StackItem>
            ))}
        </HStack>
    )
}

export default ViewTabs
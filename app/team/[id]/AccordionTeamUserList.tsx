import { CustomMembers } from '@/interfaces';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Flex, List, ListItem, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { GoTriangleUp } from 'react-icons/go';

interface Props {
    label: "Owners" | "Members";
    list: CustomMembers[]
}

const AccordionTeamUserList = ({ label, list }: Props) => {
    return (
        <Accordion allowToggle>
            <AccordionItem border={0}>
                <AccordionButton p={1} borderTop="1px" borderColor="gray.100" _hover={{ bg: "none" }}>
                    <AccordionIcon as={GoTriangleUp} w={5} h={5} />
                    {label}
                </AccordionButton>
                <AccordionPanel>
                    <List>
                        {list.length > 0 ? list.map(user => (
                            <ListItem className='p-3 rounded-md w-[50%]' border="1px" borderColor="gray.300" key={user.id}>
                                <Flex className='gap-4 items-center justify-between'>
                                    <Image className='rounded-full' src={user.image} width={30} height={30} alt={user.name} />
                                    <Text>{user.name}</Text>
                                    <Text>{user.email}</Text>
                                    <Text className='capitalize'>{user.role}</Text>
                                </Flex>
                            </ListItem>
                        )) : <ListItem fontSize="small" textColor="gray.600">No {label} Found.</ListItem>}
                    </List>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}

export default AccordionTeamUserList
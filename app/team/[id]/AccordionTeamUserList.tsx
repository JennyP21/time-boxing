import { CustomMembers } from '@/interfaces';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Table, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { GoTriangleUp } from 'react-icons/go';
import Member from './Member';

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
                    <Table size="sm">
                        <Thead>
                            <Tr>
                                <Th w="10%"></Th>
                                <Th w="20%">Name</Th>
                                <Th w="30%">Email</Th>
                                <Th w="30%">Role</Th>
                                <Th w="10%"></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {list.length > 0 ? list.map(user => (
                                <Member user={user} />
                            )) : <Text fontSize="small" textColor="gray.600">No {label} Found.</Text>}
                        </Tbody>
                    </Table>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}

export default AccordionTeamUserList
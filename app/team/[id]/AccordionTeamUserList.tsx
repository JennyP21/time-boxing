import { CustomMembers } from '@/interfaces';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import { GoTriangleUp } from 'react-icons/go';
import Member from './Member';

interface Props {
    label: "Owners" | "Members";
    list: CustomMembers[]
}

const AccordionTeamUserList = ({ label, list }: Props) => {
    const countOwners = label === "Owners" && list.length;
    console.log(countOwners);
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
                            {list.length > 0 && list.map(user => (
                                <React.Fragment key={user.team_member_id}>
                                    <Member user={user} hasOneOwner={countOwners === 1} />
                                </React.Fragment>
                            ))}
                        </Tbody>
                    </Table>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}

export default AccordionTeamUserList
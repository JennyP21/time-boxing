import { convertToTeamList } from '@/components/utils';
import { useGetTeamsByUserIdQuery } from '@/lib/features/teamApi';
import { Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import AddTeam from './AddTeam';
import LeftPanelAccordion from './LeftPanelAccordion';
import TeamList from './TeamList';

interface Props {
    user_id: string;
}

const Teams = ({ user_id }: Props) => {
    const { data } = useGetTeamsByUserIdQuery(user_id);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const teams = convertToTeamList(data);

    return (
        <LeftPanelAccordion title='Teams'>
            {teams && teams?.map(team => (
                <React.Fragment key={team.id}>
                    <TeamList teams={team} />
                </React.Fragment>
            ))}
            <Text className='cursor-pointer px-2 py-1 rounded-lg' onClick={onOpen} _hover={{
                bg: "gray.100"
            }}>Add new team</Text>
            <AddTeam isOpen={isOpen} onClose={onClose} user_id={user_id} />
        </LeftPanelAccordion>
    )
}

export default Teams
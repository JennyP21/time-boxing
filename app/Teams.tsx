import { convertToTeamList } from '@/components/utils';
import { useGetTeamsByUserIdQuery } from '@/lib/features/teamApi';
import { Button, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import AddOrUpdateTeam from './AddOrUpdateTeam';
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
        <LeftPanelAccordion title='Teams' link='/team'>
            {teams && teams.map(team => (
                <React.Fragment key={team.id}>
                    <TeamList teams={team} />
                </React.Fragment>
            ))}
            <Button className='w-full' size="sm" colorScheme="blue" onClick={onOpen}>
                Add new team
            </Button>
            <AddOrUpdateTeam isOpen={isOpen} onClose={onClose} user_id={user_id} />
        </LeftPanelAccordion>
    )
}

export default Teams
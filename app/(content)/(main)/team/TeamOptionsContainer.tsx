import { TeamI } from '@/interfaces';
import { useDisclosure } from '@chakra-ui/react';
import UpdateTeam from '../UpdateTeam';
import TeamOptions from './TeamOptions';

interface Props {
    team: TeamI;
}

const TeamOptionsContainer = ({ team }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <TeamOptions onOpen={onOpen} team_id={team.id} />
            <UpdateTeam isOpen={isOpen} onClose={onClose} currentTeam={team} />
        </>
    )
}

export default TeamOptionsContainer
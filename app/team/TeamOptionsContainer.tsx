"use client"
import { useDisclosure } from '@chakra-ui/react';
import AddOrUpdateTeam from '../AddOrUpdateTeam'
import TeamOptions from './TeamOptions'
import { TeamI } from '@/interfaces';
import { useDeleteTeamMutation } from '@/lib/features/teamApi';

interface Props {
    team: TeamI;
}

const TeamOptionsContainer = ({ team }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [deleteTeam] = useDeleteTeamMutation();
    const handleTeamDelete = async () => await deleteTeam(team.id);

    return (
        <>
            <TeamOptions onOpen={onOpen} handleTeamDelete={handleTeamDelete} />
            <AddOrUpdateTeam isOpen={isOpen} onClose={onClose} currentTeam={team} />
        </>
    )
}

export default TeamOptionsContainer
"use client"
import { useDisclosure } from '@chakra-ui/react';
import UpdateTeam from '../UpdateTeam'
import TeamOptions from './TeamOptions'
import { TeamI } from '@/interfaces';
import { useDeleteTeamMutation } from '@/lib/features/teamApi';
import { handleErrors } from '@/components/utils/handleErrors';
import { deleteTeamError } from '@/constants';

interface Props {
    team: TeamI;
}

const TeamOptionsContainer = ({ team }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [deleteTeam, { error }] = useDeleteTeamMutation();

    if (error) handleErrors(error, deleteTeamError.type);

    const handleTeamDelete = async () => await deleteTeam(team.id);

    return (
        <>
            <TeamOptions onOpen={onOpen} handleTeamDelete={handleTeamDelete} />
            <UpdateTeam isOpen={isOpen} onClose={onClose} currentTeam={team} />
        </>
    )
}

export default TeamOptionsContainer
import { TeamI } from '@/interfaces';
import { useDisclosure } from '@chakra-ui/react';
import EditIcon from './EditIcon';
import UpdateTeam from './UpdateTeam';

const UpdateTeamContainer = ({ currentTeam }: { currentTeam: TeamI }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <EditIcon onOpen={onOpen} />
            <UpdateTeam isOpen={isOpen} onClose={onClose} currentTeam={currentTeam} />
        </>
    )
}

export default UpdateTeamContainer
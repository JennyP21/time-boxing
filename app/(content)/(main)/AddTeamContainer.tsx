import { Button, useDisclosure } from '@chakra-ui/react';
import AddTeam from './AddTeam';

const AddTeamContainer = ({ user_id }: { user_id: string }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Button className='w-full flex-shrink-0' size="sm" colorScheme="blue" onClick={onOpen}>
                Add Team
            </Button>
            <AddTeam isOpen={isOpen} onClose={onClose} user_id={user_id} />
        </>
    )
}

export default AddTeamContainer
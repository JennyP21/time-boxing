import { Button, useDisclosure } from '@chakra-ui/react';
import React from 'react'
import AddOrUpdateTeam from './AddOrUpdateTeam';

interface Props {
    user_id: string
}

const AddOrUpdateTeamContainer = ({ user_id }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button className='w-full flex-shrink-0' size="sm" colorScheme="blue" onClick={onOpen}>
                Add Team
            </Button>
            <AddOrUpdateTeam isOpen={isOpen} onClose={onClose} user_id={user_id} />
        </>
    )
}

export default AddOrUpdateTeamContainer
"use client"
import { TeamI } from '@/interfaces';
import { Button, Icon, useDisclosure } from '@chakra-ui/react';
import { BsPlus } from 'react-icons/bs';
import AddMemberModal from './AddMemberModal';

interface Props {
    team: TeamI;
}

const AddMember = ({ team }: Props) => {
    const { onOpen, onClose, isOpen } = useDisclosure();

    return (
        <>
            <Button onClick={onOpen} className='self-start w-fit' colorScheme='blue'>
                <Icon as={BsPlus} w={5} h={5} /> Add Member
            </Button>
            <AddMemberModal isOpen={isOpen} onClose={onClose} team={team} />
        </>
    )
}

export default AddMember
import { TeamI } from '@/interfaces';
import { Button, Icon, useDisclosure } from '@chakra-ui/react';
import { BsPlus } from 'react-icons/bs';
import AddMember from './AddMember';

const AddMemberContainer = ({ team }: { team: TeamI }) => {
    const { onOpen, onClose, isOpen } = useDisclosure();
    return (
        <>
            <Button onClick={onOpen} className='self-start w-fit' colorScheme='blue'>
                <Icon as={BsPlus} w={5} h={5} /> Add Member
            </Button>
            <AddMember isOpen={isOpen} onClose={onClose} team={team} />
        </>
    )
}

export default AddMemberContainer
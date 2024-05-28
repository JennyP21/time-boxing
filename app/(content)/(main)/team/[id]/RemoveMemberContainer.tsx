import { CustomMembersI } from '@/interfaces';
import { Center, Icon, useDisclosure } from '@chakra-ui/react';
import { MdOutlineDelete } from 'react-icons/md';
import RemoveMember from './RemoveMember';

interface Props {
    user: CustomMembersI;
    hasOneOwner: boolean;
}

const RemoveMemberContainer = ({ hasOneOwner, user }: Props) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    return (
        <Center>
            <Icon
                as={MdOutlineDelete}
                onClick={hasOneOwner ? undefined : onOpen}
                className='p-1 rounded-full' cursor={hasOneOwner ? "not-allowed" : "pointer"}
                w={8}
                h={8}
                _hover={{ bg: "gray.300" }}
            />
            <RemoveMember user={user} isOpen={isOpen} onClose={onClose} />
        </Center>
    )
}

export default RemoveMemberContainer
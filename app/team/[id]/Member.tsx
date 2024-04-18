import { CustomMembers } from '@/interfaces';
import { Center, Icon, Td, Text, Tr } from '@chakra-ui/react';
import Image from 'next/image';
import { MdOutlineDelete } from 'react-icons/md';
import RoleSelector from './RoleSelector';

interface Props {
    user: CustomMembers;
}

const Member = ({ user }: Props) => (
    <Tr>
        <Td>
            <Image className='rounded-full' src={user.image} width={30} height={30} alt={user.name} />
        </Td>
        <Td>
            <Text>{user.name}</Text>
        </Td>
        <Td>
            <Text>{user.email}</Text>
        </Td>
        <Td>
            <RoleSelector user={user} />
        </Td>
        <Td>
            <Center>
                <Icon as={MdOutlineDelete} className='p-1 rounded-full cursor-pointer' w={8} h={8} _hover={{ bg: "gray.300" }} />
            </Center>
        </Td>
    </Tr>
)

export default Member
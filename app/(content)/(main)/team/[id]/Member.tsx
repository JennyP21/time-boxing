import { CustomMembersI } from '@/interfaces';
import { Td, Text, Tr } from '@chakra-ui/react';
import Image from 'next/image';
import RemoveMemberContainer from './RemoveMemberContainer';
import RoleSelector from './RoleSelector';

interface Props {
    user: CustomMembersI;
    hasOneOwner: boolean;
}

const Member = ({ user, hasOneOwner }: Props) => {
    return (
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
                <RoleSelector user={user} hasOneOwner={hasOneOwner} />
            </Td>
            <Td>
                <RemoveMemberContainer user={user} hasOneOwner={hasOneOwner} />
            </Td>
        </Tr>
    )
}

export default Member
import { UserI } from '@/interfaces';
import { Box, Flex } from '@chakra-ui/react';
import Image from 'next/image';

interface Props {
    users: UserI[] | undefined;
}

const AssignedUsers = ({ users }: Props) => {
    if (!users || users[0] === null) return null;
    return (
        <Flex className='gap-1'>
            {users.map(user => (
                <Box as='span' key={user.id}>
                    <Image className='rounded-full' src={user.image} width={25} height={25} alt={user.name} />
                </Box>
            ))}
        </Flex>
    )
}

export default AssignedUsers
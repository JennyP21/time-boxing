import { UserI } from '@/interfaces';
import { Box, Flex } from '@chakra-ui/react';
import Image from 'next/image';

const AssignedUsers = ({ users }: { users: UserI[] }) => {
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
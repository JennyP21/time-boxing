import { unassignUserError } from '@/constants';
import { Task_AssigneeI, UserI } from '@/interfaces';
import { useUnassignUserMutation } from '@/lib/features/taskApi';
import { Flex, Icon, MenuGroup, MenuItem, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { IoIosClose } from "react-icons/io";
import { handleErrors } from '../utils/handleErrors';

interface Props {
    assignedUsers: UserI[] | undefined;
    task_id: string;
}

const UnassignUser = ({ assignedUsers, task_id }: Props) => {
    const [unAssignUser, { error }] = useUnassignUserMutation();
    if (error) handleErrors(error, unassignUserError.type);

    const handleUserUnassignment = async (user_id: string) => {
        const data = {
            task_id,
            user_id
        } as Task_AssigneeI;
        await unAssignUser(data);
    }

    return (
        <>
            {assignedUsers && assignedUsers.length > 0 &&
                <MenuGroup title='Assigned' fontSize="small" fontWeight="normal">
                    {assignedUsers.map(user => (
                        <MenuItem key={user.id}>
                            <Flex className='items-center gap-2 w-full'>
                                <Image className='rounded-full' src={user.image} width={25} height={25} alt={user.name} />
                                <Text>{user.name}</Text>
                                <Icon as={IoIosClose} onClick={() => handleUserUnassignment(user.id)} className='ml-auto rounded-full' w={4} h={4} _hover={{ bg: "gray.300" }} />
                            </Flex>
                        </MenuItem>
                    ))}
                </MenuGroup>
            }
        </>
    )
}

export default UnassignUser
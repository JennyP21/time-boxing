import { assignUserError } from '@/constants';
import { Task_AssigneeI, UserI } from '@/interfaces';
import { useAssignUserMutation } from '@/lib/features/taskApi';
import { Flex, MenuGroup, MenuItem, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { handleErrors } from '../utils/handleErrors';

interface Props {
    suggestedUsers: UserI[];
    task_id: string;
}

const AssignUser = ({ suggestedUsers, task_id }: Props) => {
    const [assignUser, { error }] = useAssignUserMutation();
    if (error) handleErrors(error, assignUserError.type);

    const handleUserAssignment = async (user_id: string) => {
        const data = {
            task_id,
            user_id
        } as Task_AssigneeI;
        await assignUser(data);
    }

    return (
        <>
            {suggestedUsers.length > 0 &&
                <MenuGroup title='Suggestion' fontSize="small" fontWeight="normal">
                    {suggestedUsers.map((user) => (
                        <MenuItem key={user.email} onClick={() => handleUserAssignment(user.id)}>
                            <Flex className='items-center gap-2'>
                                <Image className='rounded-full' src={user.image} width={25} height={25} alt={user.name} />
                                <Text>{user.name}</Text>
                            </Flex>
                        </MenuItem>
                    ))}
                </MenuGroup>}
        </>
    )
}

export default AssignUser
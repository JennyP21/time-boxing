import Skeleton from "@/components/loading/Skeleton";
import { assignUserError, getAssigneeError, unassignUserError } from '@/constants';
import { CustomMembersI, Task_AssigneeI, UserI } from '@/interfaces';
import { useAssignUserMutation, useGetAssigneesByTaskIdQuery, useUnAssignUserMutation } from '@/lib/features/taskApi';
import { Flex, Icon, Menu, MenuButton, MenuGroup, MenuItem, MenuList, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { IoIosClose } from "react-icons/io";
import { TiUserAddOutline } from 'react-icons/ti';
import { handleErrors } from '../utils/handleErrors';
import AssignedUsers from './AssignedUsers';

interface Props {
    users: UserI[] | CustomMembersI[]
    task_id: string;
}

const AssignUser = ({ users, task_id }: Props) => {
    const { data: assignedUsers, isLoading, error } = useGetAssigneesByTaskIdQuery(task_id);
    if (error) handleErrors(error, getAssigneeError.type);

    const assignedUsersEmail = assignedUsers && assignedUsers[0] !== null && assignedUsers?.map(item => item.email);
    const unAssignedUsers = assignedUsersEmail ? users.filter(user => !assignedUsersEmail.includes(user.email)) : users;

    const [assignUser, { error: userAssignUser }] = useAssignUserMutation();
    if (userAssignUser) handleErrors(userAssignUser, assignUserError.type);
    const handleUserAssignment = async (user_id: string) => {
        const data = {
            task_id,
            user_id
        } as Task_AssigneeI;
        await assignUser(data);
    }
    const getUserId = (user: UserI | CustomMembersI) => "user_id" in user ? user.user_id : user.id;

    const [unAssignUser, { error: userUnassignUser }] = useUnAssignUserMutation();
    if (userUnassignUser) handleErrors(userUnassignUser, unassignUserError.type);
    const handleUserUnAssignment = async (user_id: string) => {
        const data = {
            task_id,
            user_id
        } as Task_AssigneeI;
        await unAssignUser(data);
    }
    return (
        <Flex className='gap-1 my-1 items-center'>
            <Menu closeOnSelect={false}>
                <MenuButton>
                    <Icon as={TiUserAddOutline} w={6} h={6} mr={2} />
                </MenuButton>
                <MenuList className='flex flex-col gap-2'>
                    <MenuGroup title='Assigned' fontSize="small" fontWeight="normal">
                        {assignedUsers && assignedUsers[0] !== null && assignedUsers.map(user => (
                            <MenuItem key={user.id}>
                                <Flex className='items-center gap-2 w-full'>
                                    <Image className='rounded-full' src={user.image} width={25} height={25} alt={user.name} />
                                    <Text>{user.name}</Text>
                                    <Icon as={IoIosClose} onClick={() => handleUserUnAssignment(user.id)} className='ml-auto rounded-full' w={4} h={4} _hover={{ bg: "gray.300" }} />
                                </Flex>
                            </MenuItem>
                        ))}
                    </MenuGroup>
                    {unAssignedUsers && unAssignedUsers.length > 0 && <MenuGroup title='Suggestion' fontSize="small" fontWeight="normal">
                        {unAssignedUsers.map((user) => (
                            <MenuItem key={user.email} onClick={() => handleUserAssignment(getUserId(user))}>
                                <Flex className='items-center gap-2'>
                                    <Image className='rounded-full' src={user.image} width={25} height={25} alt={user.name} />
                                    <Text>{user.name}</Text>
                                </Flex>
                            </MenuItem>
                        ))}
                    </MenuGroup>}
                </MenuList>
            </Menu>
            {isLoading ?
                <Flex className='gap-1'>
                    <Skeleton circle width={25} height={25} />
                    <Skeleton circle width={25} height={25} />
                    <Skeleton circle width={25} height={25} />
                </Flex>
                :
                <AssignedUsers users={assignedUsers} />
            }
        </Flex >
    )
}

export default AssignUser
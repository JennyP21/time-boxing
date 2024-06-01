import Skeleton from "@/components/loading/Skeleton";
import { getAssigneeError } from '@/constants';
import { UserI } from '@/interfaces';
import { useGetAssigneesByTaskIdQuery } from '@/lib/features/taskApi';
import { Flex, Icon, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import { TiUserAddOutline } from 'react-icons/ti';
import { handleErrors } from '../utils/handleErrors';
import AssignedUsers from './AssignedUsers';
import AssignUser from "./AssignUser";
import UnassignUser from "./UnassignUser";

interface Props {
    users: UserI[]
    task_id: string;
}

const AssignUserContainer = ({ users, task_id }: Props) => {
    const { data: assignedUsers, isLoading, error } = useGetAssigneesByTaskIdQuery(task_id);
    if (error) handleErrors(error, getAssigneeError.type);

    const assignedUsersEmail = assignedUsers && assignedUsers?.map(item => item.email);
    const suggestedUsers = assignedUsersEmail ? users.filter(user => !assignedUsersEmail.includes(user.email)) : users;

    return (
        <Flex className='gap-1 my-1 items-center'>
            <Menu closeOnSelect={false}>
                <MenuButton>
                    <Icon as={TiUserAddOutline} w={6} h={6} mr={2} />
                </MenuButton>
                <MenuList className='flex flex-col gap-2'>
                    <UnassignUser assignedUsers={assignedUsers} task_id={task_id} />
                    <AssignUser suggestedUsers={suggestedUsers} task_id={task_id} />
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

export default AssignUserContainer
import { UserI } from '@/interfaces';
import { Flex, Icon, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import { TiUserAddOutline } from 'react-icons/ti';
import AssignedUsers from './AssignedUsers';
import AssignUser from "./AssignUser";
import UnassignUser from "./UnassignUser";

interface Props {
    users: UserI[];
    task_id: string;
    assignedUsers: UserI[];
}

const AssignUserContainer = ({ users, task_id, assignedUsers }: Props) => {
    const assignedUsersEmail = assignedUsers?.map(item => item.email) || [];
    const suggestedUsers = users.filter(user => !assignedUsersEmail.includes(user.email));

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
            {assignedUsers && <AssignedUsers users={assignedUsers} />}
        </Flex >
    )
}

export default AssignUserContainer
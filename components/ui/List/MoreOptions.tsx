"use client"
import { TaskI } from '@/interfaces';
import { useDeleteTaskMutation } from '@/lib/features/taskApi';
import { Icon, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';

interface Props {
    task: TaskI;
}

const MoreOptions = ({ task }: Props) => {
    const [deleteTask] = useDeleteTaskMutation();
    const handleTaskDelete = async () => {
        await deleteTask(task.id);
    }

    return (
        <Menu>
            <MenuButton className='w-full'>
                <Icon as={BsThreeDotsVertical} className='rounded-full mx-auto' w={4} h={4} _hover={{ bg: "gray.200" }} />
            </MenuButton>
            <MenuList>
                <MenuItem onClick={handleTaskDelete}>Delete</MenuItem>
                <MenuItem>Move</MenuItem>
            </MenuList>
        </Menu>
    )
}

export default MoreOptions
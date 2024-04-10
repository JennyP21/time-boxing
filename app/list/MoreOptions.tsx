import { deleteTask } from '@/data-access/task';
import { TaskI } from '@/interfaces';
import { Icon, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';

interface Props {
    task: TaskI;
}

const MoreOptions = ({ task }: Props) => {

    const handleDelete = async () => await deleteTask(task.id);

    return (
        <Menu>
            <MenuButton className='w-full'>
                <Icon as={BsThreeDotsVertical} className='rounded-full mx-auto' w={4} h={4} _hover={{ bg: "gray.200" }} />
            </MenuButton>
            <MenuList>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
                <MenuItem>Move</MenuItem>
            </MenuList>
        </Menu>
    )
}

export default MoreOptions
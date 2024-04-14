"use client"
import { Icon, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';

interface Props {
    onOpen: () => void;
    handleTaskDelete: () => void;
    align: "center" | "end";
}

const MoreOptions = ({ handleTaskDelete, onOpen, align }: Props) => {
    return (
        <Menu>
            <MenuButton className={align === "end" ? 'absolute right-2 top-1' : "w-full"}>
                <Icon as={BsThreeDotsVertical} className='rounded-full mx-auto' w={4} h={4} _hover={{ bg: "gray.200" }} />
            </MenuButton>
            <MenuList>
                <MenuItem onClick={handleTaskDelete}>Delete</MenuItem>
                <MenuItem onClick={onOpen}>Move</MenuItem>
            </MenuList>
        </Menu>
    )
}

export default MoreOptions
"use client"
import { Icon, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';

interface Props {
    onOpen: () => void;
    handleTaskDelete: () => void;
    align: "center" | "end";
    canMove: boolean;
}

const MoreOptions = ({ handleTaskDelete, onOpen, align, canMove }: Props) => {
    return (
        <Menu>
            <MenuButton className={align === "end" ? 'absolute right-2 top-1' : "w-full"}>
                <Icon as={BsThreeDotsVertical} w={4} h={4} />
            </MenuButton>
            <MenuList>
                <MenuItem onClick={handleTaskDelete}>Delete</MenuItem>
                {canMove && <MenuItem onClick={onOpen}>Move</MenuItem>}
            </MenuList>
        </Menu>
    )
}

export default MoreOptions
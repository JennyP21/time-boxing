import { Icon, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

const MoreOptions = () => {
    return (
        <Menu>
            <MenuButton className='w-full'>
                <Icon as={BsThreeDotsVertical} className='rounded-full mx-auto' w={4} h={4} _hover={{ bg: "gray.200" }} />
            </MenuButton>
            <MenuList>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Move</MenuItem>
            </MenuList>
        </Menu>
    )
}

export default MoreOptions
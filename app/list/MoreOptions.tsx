import { Icon, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'

const MoreOptions = () => {
    return (
        <Menu key="root" closeOnSelect={false} autoSelect={false}>
            <MenuButton>
                <Icon as={HiOutlineDotsHorizontal} w={4} h={4} />
            </MenuButton>
            <MenuList className='relative'>
                <MenuItem></MenuItem>
            </MenuList>
        </Menu>
    )
}

export default MoreOptions
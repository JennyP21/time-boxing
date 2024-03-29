import { Flex, Menu, MenuButton, Icon, MenuList, MenuItem } from '@chakra-ui/react'
import React from 'react'
import { TiUserAddOutline } from 'react-icons/ti'
import Image from "next/image";

interface Props {
    image: string,
    name: string
}

const AddUserToTask = ({ image, name }: Props) => {
    return (
        <Flex className='gap-1 my-1 p-1'>
            <Menu>
                <MenuButton>
                    <Icon as={TiUserAddOutline} w={6} h={6} />
                </MenuButton>
                <MenuList>
                    <MenuItem>User 1</MenuItem>
                    <MenuItem>User 2</MenuItem>
                    <MenuItem>User 3</MenuItem>
                </MenuList>
            </Menu>
            <Image className='rounded-full' src={image} width={30} height={30} alt={name} />
        </Flex>
    )
}

export default AddUserToTask
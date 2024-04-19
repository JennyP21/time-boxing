import { CustomMembersI, UserI } from '@/interfaces';
import { Flex, Icon, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { TiUserAddOutline } from 'react-icons/ti';

interface Props {
    users: UserI[] | CustomMembersI[]
}

const AssignUser = ({ users }: Props) => {
    return (
        <Flex className='gap-1 my-1'>
            <Menu>
                <MenuButton>
                    <Icon as={TiUserAddOutline} w={6} h={6} mr={2} />
                </MenuButton>
                <MenuList>
                    <MenuItem>
                        {users.map(user => (
                            <Flex className='items-center gap-2' key={user.email}>
                                <Image className='rounded-full' src={user.image} width={25} height={25} alt={user.name} />
                                <Text>{user.name}</Text>
                            </Flex>
                        ))}
                    </MenuItem>
                </MenuList>
            </Menu>
        </Flex>
    )
}

export default AssignUser
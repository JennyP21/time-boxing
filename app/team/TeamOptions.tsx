import { Icon, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { BsThreeDotsVertical } from 'react-icons/bs'

interface Props {
    onOpen: () => void;
    handleTeamDelete: () => void;
}

const TeamOptions = ({ onOpen, handleTeamDelete }: Props) => {
    return (
        <Menu>
            <MenuButton className='absolute right-2 top-2'>
                <Icon as={BsThreeDotsVertical} w={4} h={4} />
            </MenuButton>
            <MenuList>
                <MenuItem onClick={handleTeamDelete}>Delete</MenuItem>
                <MenuItem onClick={onOpen}>Edit</MenuItem>
            </MenuList>
        </Menu>
    )
}

export default TeamOptions
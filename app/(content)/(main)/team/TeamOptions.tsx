import { handleErrors } from '@/components/utils/handleErrors';
import { deleteTeamError } from '@/constants';
import { useDeleteTeamMutation } from '@/lib/features/teamApi';
import { Icon, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';

interface Props {
    onOpen: () => void;
    team_id: string;
}

const TeamOptions = ({ onOpen, team_id }: Props) => {
    const [deleteTeam, { error }] = useDeleteTeamMutation();

    if (error) handleErrors(error, deleteTeamError.type);

    const handleTeamDelete = async () => await deleteTeam(team_id);

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
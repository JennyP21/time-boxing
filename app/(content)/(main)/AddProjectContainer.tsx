import { handleErrors } from '@/components/utils/handleErrors';
import { getProjectError } from '@/constants';
import { useGetTeamsByUserIdQuery } from '@/lib/features/teamApi';
import { Button, useDisclosure } from '@chakra-ui/react';
import AddProject from './AddProject';

const AddProjectContainer = ({ user_id }: { user_id: string }) => {
    const { onClose, onOpen, isOpen } = useDisclosure();

    const { data: teams, error } = useGetTeamsByUserIdQuery(user_id);

    if (error) handleErrors(error, getProjectError.type);

    return (
        <>
            <Button className="w-full flex-shrink-0" onClick={onOpen} colorScheme="blue" size="sm">
                Add Project
            </Button>
            {teams && <AddProject isOpen={isOpen} onClose={onClose} teams={teams} user_id={user_id} />}
        </>
    )
}

export default AddProjectContainer
import ConfirmDelete from '@/components/ui/ConfirmDelete';
import { handleErrors } from '@/components/utils/handleErrors';
import { deleteProjectError } from '@/constants';
import { ProjectI } from '@/interfaces';
import { useDeleteProjectMutation } from '@/lib/features/projectApi';
import { Icon, useDisclosure } from '@chakra-ui/react';
import { MdOutlineDelete } from 'react-icons/md';

const DeleteProject = ({ project }: { project: ProjectI }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [deleteProject, { error, isLoading }] = useDeleteProjectMutation();
    if (error) handleErrors(error, deleteProjectError.type);

    const handleProjectDelete = async () => await deleteProject(project.id);

    return (
        <>
            <Icon className='hover:bg-gray-300 rounded-full p-1' as={MdOutlineDelete} w={7} h={7} onClick={onOpen} />
            <ConfirmDelete isOpen={isOpen} onClose={onClose} item={project.name} isLoading={isLoading} handleRemove={handleProjectDelete} />
        </>
    )
}

export default DeleteProject
import { handleErrors } from '@/components/utils/handleErrors';
import { deleteLabelError } from '@/constants';
import { useDeleteLabelMutation } from '@/lib/features/labelApi';
import { Icon } from '@chakra-ui/react';
import { MdOutlineDelete } from 'react-icons/md';

const DeleteLabel = ({ label_id }: { label_id: string }) => {

    const [deleteLabel, { error, isLoading }] = useDeleteLabelMutation();

    if (error) handleErrors(error, deleteLabelError.type);

    const handleLabelDelete = async (id: string) => {
        await deleteLabel(id);
    }

    return (
        <Icon
            cursor={isLoading ? "not-allowed" : "pointer"}
            onClick={isLoading ? undefined : () => handleLabelDelete(label_id)}
            as={MdOutlineDelete}
            className='rounded-full p-1'
            w={6}
            h={6}
            _hover={{ bg: "gray.300" }}
        />
    )
}

export default DeleteLabel
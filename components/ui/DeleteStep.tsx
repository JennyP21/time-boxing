import { handleErrors } from '@/components/utils/handleErrors';
import { deleteStepError } from '@/constants';
import { useDeleteStepMutation } from '@/lib/features/stepsApi';
import { InputRightElement } from '@chakra-ui/react';
import { MdOutlineDelete } from 'react-icons/md';

const DeleteStep = ({ step_id }: { step_id: string }) => {
    const [deleteStep, { error }] = useDeleteStepMutation();
    if (error) handleErrors(error, deleteStepError.type);

    const handleDeleteStep = async () => {
        await deleteStep(step_id);
    }

    return (
        <InputRightElement onClick={handleDeleteStep} _groupHover={{ visibility: "visible" }} className='rounded-full hover:bg-gray-300 !h-7 !w-7' visibility="hidden" children={<MdOutlineDelete />} />
    )
}

export default DeleteStep
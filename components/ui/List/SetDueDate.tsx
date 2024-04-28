import { handleErrors } from '@/components/utils/handleErrors';
import { updateTaskError } from '@/constants';
import { TaskI } from '@/interfaces';
import { useUpdateTaskMutation } from '@/lib/features/taskApi';
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { SyntheticEvent } from 'react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    task_id: string;
    currDueDate: string;
}

const SetDueDate = ({ isOpen, onClose, task_id, currDueDate }: Props) => {

    const [updateTask, { error }] = useUpdateTaskMutation();

    if (error) handleErrors(error, updateTaskError.type);

    const handleTaskUpdate = async (e: SyntheticEvent) => {
        const newValue = (e.target as HTMLSelectElement).value;

        if (currDueDate !== newValue) {
            const data = { id: task_id, end_date: newValue } as TaskI;
            await updateTask(data);
        }
    }

    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent p={4}>
                <ModalHeader>Change Due Date</ModalHeader>
                <ModalBody>
                    <Input type="date" defaultValue={currDueDate} onChange={(e) => handleTaskUpdate(e)} />
                </ModalBody>
                <ModalFooter py={1} justifyContent="end">
                    <Button variant='ghost' onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default SetDueDate
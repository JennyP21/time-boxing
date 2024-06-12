import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import UpdateEndDate from '../UpdateEndDate';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    task_id: string;
    currEndDate: string;
    currStartDate: string;
}

const UpdateDueDateModal = ({ isOpen, onClose, task_id, currEndDate, currStartDate }: Props) => {
    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent p={4} mx={2}>
                <ModalCloseButton />
                <ModalHeader>Change Due Date</ModalHeader>
                <ModalBody>
                    <UpdateEndDate currEndDate={currEndDate} currStartDate={currStartDate} task_id={task_id} withLabel={false} />
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default UpdateDueDateModal
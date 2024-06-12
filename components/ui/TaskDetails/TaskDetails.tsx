import { TaskI } from '@/interfaces';
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import TaskDetailsBody from './TaskDetailsBody';
import TaskDetailsFooter from './TaskDetailsFooter';
import TaskDetailsHeader from './TaskDetailsHeader';

interface Props {
    task: TaskI;
    isOpen: boolean;
    onClose: () => void;
}

const TaskDetails = ({ isOpen, onClose, task }: Props) => {
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent p={1} my={5} minWidth="45%" maxH="95%" overflowY="scroll" mx={2}>
                    <TaskDetailsHeader task={task} currentTitle={task.title} project_id={task.project_id} />
                    <TaskDetailsBody task={task} />
                    <TaskDetailsFooter created_at={task.created_at} onClose={onClose} />
                </ModalContent>
            </Modal>
        </form>
    )
}

export default TaskDetails
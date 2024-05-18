import { TaskI } from '@/interfaces';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, RadioGroup, Stack, Text } from '@chakra-ui/react';
import { formatDate } from '../../utils';
import StepList from './StepList';
import TaskAttributes from './TaskAttributes';
import TaskDetailsHeader from './TaskDetailsHeader';
import TaskNote from './TaskNote';

interface Props {
    task: TaskI;
    isOpen: boolean;
    onClose: () => void;
}

const TaskDetails = ({ isOpen, onClose, task }: Props) => {
    const { id, severity, progress, note, title, start_date, end_date, showOnTask, project_id, created_at } = task;

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent p={1} my={5} minWidth="45%" maxH="95%" overflowY="scroll">
                    <ModalHeader fontWeight="500" fontSize="small" pb={0}>
                        <TaskDetailsHeader task={task} currentTitle={title} project_id={project_id} />
                    </ModalHeader>
                    <ModalBody py={0}>
                        <Stack textAlign="left" bg="white" width="100%" justifyContent="center">
                            <TaskAttributes task_id={id} start_date={start_date} end_date={end_date} progress={progress} severity={severity} />
                            <RadioGroup defaultValue={showOnTask}>
                                <TaskNote task_id={id} note={note} />
                                <StepList task_id={id} />
                            </RadioGroup>
                        </Stack>
                    </ModalBody>
                    <ModalFooter py={1} justifyContent="space-between">
                        <Text fontSize="small" textColor="gray.500">
                            {`Created at ${formatDate(created_at)}`}
                        </Text>
                        <Button variant='ghost' onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </form>
    )
}

export default TaskDetails
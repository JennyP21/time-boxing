import { TaskWithUserI } from '@/interfaces';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, RadioGroup, Stack, Text } from '@chakra-ui/react';
import StepList from './StepList';
import TaskAttributes from './TaskAttributes';
import TaskDetailsHeader from './TaskDetailsHeader';
import TaskNote from './TaskNote';
import { formatDate } from '../utils';

interface Props {
    taskWithUser: TaskWithUserI;
    isOpen: boolean;
    onClose: () => void;
}

const TaskDetails = ({ isOpen, onClose, taskWithUser }: Props) => {
    const { id, severity, progress, note, title, start_date, end_date, showOnTask, created_at } = taskWithUser.task;
    const { id: user_id, image, name } = taskWithUser.user;

    return (
        <form>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent p={1} my={5} minWidth="45%">
                    <ModalHeader fontWeight="500" fontSize="small" pb={0}>
                        <TaskDetailsHeader task_id={id} user_id={user_id} image={image} currentTitle={title} name={name} />
                    </ModalHeader>
                    <ModalBody py={0}>
                        <Stack textAlign="left" bg="white" width="100%" justifyContent="center">
                            <TaskAttributes task_id={id} user_id={user_id} start_date={start_date} end_date={end_date} progress={progress} severity={severity} />
                            <RadioGroup defaultValue={showOnTask}>
                                <TaskNote task_id={id} user_id={user_id} note={note} />
                                <StepList task_id={id} user_id={user_id} />
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
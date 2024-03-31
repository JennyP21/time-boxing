import { TaskWithUserI } from '@/interfaces';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack } from '@chakra-ui/react';
import StepList from './StepList';
import TaskAttributes from './TaskAttributes';
import TaskDetailsHeader from './TaskDetailsHeader';
import TaskNote from './TaskNote';

interface Props {
    taskWithUser: TaskWithUserI;
    isOpen: boolean;
    onClose: () => void;
}

const TaskDetails = ({ isOpen, onClose, taskWithUser }: Props) => {
    const { id, severity, progress, note, steps, title, start_date, end_date } = taskWithUser.tasks;
    const { id: user_id, image, name } = taskWithUser.user;

    return (
        <form>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent p={1} my={5} minWidth="45%">
                    <ModalHeader fontWeight="500" fontSize="small" pb={0}>
                        <TaskDetailsHeader task_id={id} user_id={user_id} image={image} currentTitle={title} name={name} />
                    </ModalHeader>
                    <ModalBody py={0}>
                        <Stack textAlign="left" bg="white" width="100%" justifyContent="center">
                            <TaskAttributes task_id={id} user_id={user_id} start_date={start_date} end_date={end_date} progress={progress} severity={severity} />
                            <TaskNote task_id={id} user_id={user_id} note={note} />
                            <StepList steps={steps} />
                        </Stack>
                    </ModalBody>
                    <ModalFooter pt={0}>
                        <Button colorScheme='blue' mr={3} isDisabled={true}>
                            Save
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </form>
    )
}

export default TaskDetails
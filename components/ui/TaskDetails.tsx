import { taskProgress, taskSeverity } from '@/constants';
import { TaskWithUserI } from '@/interfaces';
import { Box, Button, Checkbox, Flex, Grid, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, Textarea } from '@chakra-ui/react';
import AssignUserToTask from './AssignUserToTask';
import StepList from './StepList';
import TaskSelect from './TaskSelect';
import TaskDetailsHeader from './TaskDetailsHeader';

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
                            <Grid templateAreas={{
                                base: `"item1" "item2" "item3" "item4"`,
                                md: `"item1 item2" "item3 item4"`
                            }} gap={2}>
                                <Input type="date" placeholder='Start Date' defaultValue={start_date} />
                                <Input type="date" placeholder='Start Date' defaultValue={end_date} />
                                <TaskSelect defaultValue={severity} options={taskSeverity} />
                                <TaskSelect defaultValue={progress} options={taskProgress} />
                            </Grid>
                            <Box width="100%">
                                <Flex justifyContent="space-between">
                                    <Text fontSize="small">Note:</Text>
                                    <Checkbox my={1} size={"md"} colorScheme='blue'><Text fontSize={"small"}>Show on card</Text></Checkbox>
                                </Flex>
                                <Textarea resize="none" fontSize="small" defaultValue={note} />
                            </Box>
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
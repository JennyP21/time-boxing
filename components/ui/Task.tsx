import { taskProgress, taskSeverity } from '@/constants';
import { TaskWithUserI } from '@/interfaces';
import { Box, Button, Checkbox, Flex, Grid, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, Textarea } from '@chakra-ui/react';
import AddUserToTask from './AddUserToTask';
import TaskList from './TaskList';
import TaskSelect from './TaskSelect';

interface Props {
    taskWithUser: TaskWithUserI;
    isOpen: boolean;
    onClose: () => void;
}

const Task = ({ isOpen, onClose, taskWithUser }: Props) => {
    const { severity, progress, note, steps, title, start_date, end_date } = taskWithUser.tasks;
    const { image, name } = taskWithUser.user;

    return (
        <form>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent p={1} my={5} minWidth="45%">
                    <ModalHeader fontWeight="500" fontSize="small" pb={0}>
                        <Text mb={0.5} fontWeight={"700"}>Tasks</Text>
                        <Input className='font-medium' placeholder='Name of task' defaultValue={title} border="none" />
                        <AddUserToTask image={image} name={name} />
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
                            <TaskList steps={steps} />
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

export default Task
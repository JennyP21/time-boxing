import { Box, Button, Flex, Grid, Icon, Input, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, Text, Textarea } from '@chakra-ui/react';
import { TiUserAddOutline } from "react-icons/ti";
import { CgProfile } from "react-icons/cg";
import TaskList from './TaskList';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const data = {
    title: "AD Migration",
    start_date: new Date(),
    end_date: new Date(),
    severity: "high",
    progress: "In Progress",
    notes: "impedit minima voluptates exercitationem quos consequatur ipsum, quibusdam, aliquid atque iusto laudantium cupiditate.",
    steps: [
        "Analyze",
        "Report",
        "Test",
        "Change",
        "Test",
        "Decommision Old",
        "Communicate"
    ],
    created_at: new Date(),
    updated_at: new Date(),
}

const Task = ({ isOpen, onClose }: Props) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent p={1} my={5} minWidth="45%">
                <ModalHeader fontWeight="500" fontSize="small" pb={0}>
                    <Text mb={0.5} fontWeight={"700"}>
                        Tasks
                    </Text>
                    <Input placeholder='Name of task' fontSize="medium" />
                    <Flex my={1} p={1} gap={2} alignItems="center" fontSize="small">
                        <Menu>
                            <MenuButton>
                                <Icon as={TiUserAddOutline} w={6} h={6} />
                            </MenuButton>
                            <MenuList>
                                <MenuItem>User 1</MenuItem>
                                <MenuItem>User 2</MenuItem>
                                <MenuItem>User 3</MenuItem>
                            </MenuList>
                        </Menu>
                        <Icon as={CgProfile} w={6} h={6} />
                    </Flex>
                </ModalHeader>
                <ModalBody py={0}>
                    <Stack textAlign="left" bg="white" width="100%" justifyContent="center">
                        <Grid templateAreas={{
                            base: `
                                "item1"
                                "item2"
                                "item3"
                                "item4"
                            `,
                            md: `
                                "item1 item2"
                                "item3 item4"
                            `
                        }} gap={2}>
                            <Input type="date" placeholder='Start Date' />
                            <Input type="date" placeholder='Start Date' />
                            <Select placeholder='Severity'>
                                <option value='low'>Low</option>
                                <option value='medium'>Medium</option>
                                <option value='high'>High</option>
                                <option value='urgent'>Urgent</option>
                            </Select>
                            <Select placeholder='Progress'>
                                <option value='Not Started'>Not Started</option>
                                <option value='In Progress'>In Progress</option>
                                <option value='On Hold'>On Hold</option>
                                <option value='Completed'>Completed</option>
                            </Select>
                        </Grid>
                        <Box width="100%">
                            <Text fontSize="small">Note:</Text>
                            <Textarea resize="none" fontSize="small" />
                        </Box>
                        <TaskList />
                    </Stack>
                </ModalBody>
                <ModalFooter pt={0}>
                    <Button colorScheme='blue' mr={3} isDisabled={true}>
                        Save
                    </Button>
                    <Button variant='ghost' onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    )
}

export default Task
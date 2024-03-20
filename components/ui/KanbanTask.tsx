"use client"
import { Flex, Heading, Stack, Text, useDisclosure } from '@chakra-ui/react';
import Task from './Task';

const KanbanTask = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Stack textAlign="left" bg="white" width="100%" p={2} onClick={onOpen} cursor="pointer">
            <Heading as="h6" size="sm">
                Task
            </Heading>
            <Flex flexDir="column">
                <Text>Task 1</Text>
                <Text>Task 2</Text>
                <Text>Task 3</Text>
            </Flex>
            <Text>Assigned to JP</Text>
            <Text>Due by 2024-04-01</Text>
            <Task isOpen={isOpen} onClose={onClose} />
        </Stack>
    )
}

export default KanbanTask
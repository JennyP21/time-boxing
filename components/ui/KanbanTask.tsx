"use client"
import { Flex, Heading, Stack, Text, useDisclosure } from '@chakra-ui/react';
import Task from './Task';

const KanbanTask = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Stack
            backgroundColor="gray.100"
            p={2}
            textAlign="left"
            width="100%"
            onClick={onOpen}
        >
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
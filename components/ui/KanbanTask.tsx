"use client"
import { Flex, Heading, Stack, Text, useDisclosure } from '@chakra-ui/react';
import Task from './Task';
import { TaskI } from '@/interfaces';

interface Props {
    task: TaskI
}

const KanbanTask = ({ task }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Stack
            backgroundColor="gray.100"
            p={2}
            textAlign="left"
            width="100%"
            cursor="pointer"
            onClick={onOpen}
        >
            <Heading as="h6" size="sm">
                {task.title}
            </Heading>
            <Flex flexDir="column">
                {task.steps.map(step => (
                    <Text key={step}>{step}</Text>
                ))}
            </Flex>
            <Text></Text>
            <Text>Due by {task.end_date}</Text>
            <Task isOpen={isOpen} onClose={onClose} />
        </Stack>
    )
}

export default KanbanTask
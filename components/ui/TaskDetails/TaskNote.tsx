"use client"
import { TaskI } from '@/interfaces';
import { useUpdateTaskMutation } from '@/lib/features/taskApi';
import { Box, Flex, Radio, Text, Textarea } from '@chakra-ui/react';
import { useState } from 'react';

interface Props {
    note: string;
    task_id: string;
}

const TaskNote = ({ note, task_id }: Props) => {
    const [newNote, setNote] = useState(note);

    const [updateTask] = useUpdateTaskMutation();

    const handleSubmit = async () => {
        if (newNote !== note) {
            const data = { note: newNote, id: task_id } as TaskI;
            await updateTask(data);
        }
    }

    const handleShowOnCard = async () => {
        const data = { showOnTask: "note", id: task_id } as TaskI;
        await updateTask(data);
    }

    return (
        <Box width="100%">
            <Flex justifyContent="space-between">
                <Text fontSize="small">Note:</Text>
                <Radio my={1} size={"md"} colorScheme='blue' value='note' onChange={handleShowOnCard}><Text fontSize={"small"}>Show on card</Text></Radio>
            </Flex>
            <Textarea resize="none" fontSize="small" defaultValue={newNote} onBlur={handleSubmit} onChange={(e) => setNote(e.target.value)} />
        </Box>
    )
}

export default TaskNote
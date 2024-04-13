"use client"
import TaskDetails from '@/components/ui/TaskDetails';
import { TaskI, TaskWithUserI } from '@/interfaces';
import { Text, useDisclosure } from '@chakra-ui/react';

interface Props {
    task: TaskI;
}

const TaskTitle = ({ task }: Props) => {
    const { onOpen, onClose, isOpen } = useDisclosure();
    return (
        <>
            <Text
                className='hover:underline hover:underline-offset-1 cursor-pointer'
                textDecor={task.progress === "Completed" ? "line-through" : ""}
                onClick={onOpen}
            >
                {task.title}
            </Text>
            <TaskDetails isOpen={isOpen} onClose={onClose} task={task} />
        </>
    )
}

export default TaskTitle
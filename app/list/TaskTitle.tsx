"use client"
import TaskDetails from '@/components/ui/TaskDetails';
import { TaskWithUserI } from '@/interfaces';
import { Text, useDisclosure } from '@chakra-ui/react';

interface Props {
    taskWithUser: TaskWithUserI;
}

const TaskTitle = ({ taskWithUser }: Props) => {
    const { onOpen, onClose, isOpen } = useDisclosure();
    return (
        <>
            <Text
                className='hover:underline hover:underline-offset-1 cursor-pointer'
                textDecor={taskWithUser.tasks.progress === "Completed" ? "line-through" : ""}
                onClick={onOpen}
            >
                {taskWithUser.tasks.title}
            </Text>
            <TaskDetails isOpen={isOpen} onClose={onClose} taskWithUser={taskWithUser} />
        </>
    )
}

export default TaskTitle
import TaskDetails from '@/components/ui/TaskDetails/TaskDetails';
import { TaskWithDetailsI } from '@/interfaces';
import { Text, useDisclosure } from '@chakra-ui/react';

const TaskTitle = ({ task }: { task: TaskWithDetailsI }) => {
    const { onOpen, onClose, isOpen } = useDisclosure();
    return (
        <>
            <Text
                className='hover:underline cursor-pointer'
                textDecor={task.progress === "Completed" ? "line-through" : ""}
                textColor={task.progress === "Completed" ? "gray.300" : ""}
                onClick={onOpen}
            >
                {task.title}
            </Text>
            <TaskDetails isOpen={isOpen} onClose={onClose} task={task} />
        </>
    )
}

export default TaskTitle
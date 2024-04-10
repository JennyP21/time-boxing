import { TaskI } from '@/interfaces';
import { useUpdateTaskMutation } from '@/lib/features/taskApi';
import { Checkbox } from '@chakra-ui/react';

interface Props {
    task: TaskI;
}

const CompleteTask = ({ task }: Props) => {
    const [updateTask] = useUpdateTaskMutation();
    const handleTaskUpdate = async () => {
        const data = {
            id: task.id,
            user_id: task.user_id,
            progress: task.progress === "Completed" ? "In Progress" : "Completed",
        } as TaskI;
        await updateTask(data);
    };

    return (
        <Checkbox size={"md"} defaultChecked={task.progress === "Completed"} onChange={() => handleTaskUpdate()} />
    )
}

export default CompleteTask
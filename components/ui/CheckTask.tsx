import { updateTaskError } from '@/constants';
import { TaskI } from '@/interfaces';
import { useUpdateTaskMutation } from '@/lib/features/taskApi';
import { Checkbox } from '@chakra-ui/react';
import { handleErrors } from '../utils/handleErrors';

interface Props {
    task: TaskI;
}

const CheckTask = ({ task }: Props) => {
    const [updateTask, { error }] = useUpdateTaskMutation();

    if (error) handleErrors(error, updateTaskError.type);

    const handleTaskUpdate = async () => {
        const data = {
            id: task.id,
            progress: task.progress === "Completed" ? "In Progress" : "Completed",
        } as TaskI;
        await updateTask(data);
    };

    return (
        <Checkbox size={"md"} defaultChecked={task.progress === "Completed"} onChange={() => handleTaskUpdate()} />
    )
}

export default CheckTask
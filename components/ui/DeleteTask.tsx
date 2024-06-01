import { deleteTaskError } from '@/constants';
import { useDeleteTaskMutation } from '@/lib/features/taskApi';
import { MenuItem } from '@chakra-ui/react';
import { handleErrors } from '../utils/handleErrors';

const DeleteTask = ({ task_id }: { task_id: string }) => {
    const [deleteTask, { error: taskDeleteError }] = useDeleteTaskMutation();
    if (taskDeleteError) handleErrors(taskDeleteError, deleteTaskError.type);

    const handleTaskDelete = async () => await deleteTask(task_id);

    return (
        <MenuItem as='a' onClick={handleTaskDelete}>Delete</MenuItem>
    )
}

export default DeleteTask
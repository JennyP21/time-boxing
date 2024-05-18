import { handleErrors } from '@/components/utils/handleErrors';
import { taskProgress, updateTaskError } from '@/constants';
import { TaskI } from '@/interfaces';
import { useUpdateTaskMutation } from '@/lib/features/taskApi';
import { useState } from 'react';
import AttributeContainer from './AttributeContainer';
import TaskSelect from './TaskSelect';

interface Props {
    task_id: string;
    progress: string;
}

const UpdateProgress = ({ task_id, progress }: Props) => {
    const [newProgress, setNewProgress] = useState(progress);

    const [updateTask, { error }] = useUpdateTaskMutation();
    if (error) handleErrors(error, updateTaskError.type);

    const handleSubmit = async () => {
        const data = { id: task_id, progress: newProgress } as TaskI;
        await updateTask(data);
    }

    return (
        <AttributeContainer name="Progress">
            <TaskSelect handleSubmit={handleSubmit} type="progress" setData={setNewProgress} defaultValue={progress} options={taskProgress} />
        </AttributeContainer>
    )
}

export default UpdateProgress
import { handleErrors } from '@/components/utils/handleErrors';
import { taskProgress, updateTaskError } from '@/constants';
import { TaskI } from '@/interfaces';
import { useUpdateTaskMutation } from '@/lib/features/taskApi';
import { useState } from 'react';
import AttributeContainer from './TaskDetails/AttributeContainer';
import TaskSelect from './TaskDetails/TaskSelect';

interface Props {
    task_id: string;
    currProgress: string;
    selectSize: "sm" | "md";
    withLabel: boolean;
}

const UpdateProgress = ({ task_id, currProgress, selectSize, withLabel }: Props) => {
    const [newProgress, setNewProgress] = useState(currProgress);

    const [updateTask, { error }] = useUpdateTaskMutation();
    if (error) handleErrors(error, updateTaskError.type);

    const handleSubmit = async () => {
        const data = { id: task_id, progress: newProgress } as TaskI;
        await updateTask(data);
    }

    return (
        <>
            {withLabel ?
                <AttributeContainer name="Progress">
                    <TaskSelect handleSubmit={handleSubmit} type="progress" setData={setNewProgress} defaultValue={currProgress} options={taskProgress} selectSize={selectSize} />
                </AttributeContainer>
                :
                <TaskSelect handleSubmit={handleSubmit} type="progress" setData={setNewProgress} defaultValue={currProgress} options={taskProgress} selectSize={selectSize} />
            }
        </>
    )
}

export default UpdateProgress
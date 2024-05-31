import { handleErrors } from '@/components/utils/handleErrors';
import { taskSeverity, updateTaskError } from '@/constants';
import { TaskI } from '@/interfaces';
import { useUpdateTaskMutation } from '@/lib/features/taskApi';
import { useState } from 'react';
import AttributeContainer from './TaskDetails/AttributeContainer';
import TaskSelect from './TaskDetails/TaskSelect';

interface Props {
    task_id: string;
    currSeverity: string;
    selectSize: "sm" | "md";
    withLabel: boolean;
}

const UpdateSeverity = ({ task_id, currSeverity, selectSize, withLabel }: Props) => {
    const [newSeverity, setNewSeverity] = useState(currSeverity);

    const [updateTask, { error }] = useUpdateTaskMutation();
    if (error) handleErrors(error, updateTaskError.type);

    const handleSubmit = async () => {
        const data = { id: task_id, severity: newSeverity } as TaskI;
        await updateTask(data);
    }

    return (
        <>
            {withLabel ?
                <AttributeContainer name="Severity">
                    <TaskSelect handleSubmit={handleSubmit} type="severity" setData={setNewSeverity} defaultValue={currSeverity} options={taskSeverity} selectSize={selectSize} />
                </AttributeContainer>
                :
                <TaskSelect handleSubmit={handleSubmit} type="severity" setData={setNewSeverity} defaultValue={currSeverity} options={taskSeverity} selectSize={selectSize} />
            }
        </>
    )
}

export default UpdateSeverity
import { handleErrors } from '@/components/utils/handleErrors';
import { taskSeverity, updateTaskError } from '@/constants';
import { TaskI } from '@/interfaces';
import { useUpdateTaskMutation } from '@/lib/features/taskApi';
import { useState } from 'react';
import AttributeContainer from './AttributeContainer';
import TaskSelect from './TaskSelect';

interface Props {
    task_id: string;
    severity: string;
}

const UpdateSeverity = ({ task_id, severity }: Props) => {
    const [newSeverity, setNewSeverity] = useState(severity);

    const [updateTask, { error }] = useUpdateTaskMutation();
    if (error) handleErrors(error, updateTaskError.type);

    const handleSubmit = async () => {
        const data = { id: task_id, severity: newSeverity } as TaskI;
        await updateTask(data);
    }

    return (
        <AttributeContainer name="Severity">
            <TaskSelect handleSubmit={handleSubmit} type="severity" setData={setNewSeverity} defaultValue={severity} options={taskSeverity} />
        </AttributeContainer>
    )
}

export default UpdateSeverity
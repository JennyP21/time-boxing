"use client"
import BucketSelector from '@/components/ui/BucketSelector';
import { handleErrors } from '@/components/utils/handleErrors';
import { updateTaskError } from '@/constants';
import { ProjectI, TaskI } from '@/interfaces';
import { useUpdateTaskMutation } from '@/lib/features/taskApi';
import { useState } from 'react';

interface Props {
    currData: TaskI;
    project: ProjectI;
}

const UpdateBucket = ({ currData, project }: Props) => {
    const [data, setData] = useState(currData);

    const [updateTask, { error }] = useUpdateTaskMutation();

    if (error) handleErrors(error, updateTaskError.type);

    const handleTaskUpdate = async () => {
        if (currData.bucket_id !== data.bucket_id) {
            await updateTask({
                id: data.id,
                bucket_id: data.bucket_id,
                project_id: project.id
            } as TaskI);
        }
    }

    return (
        <BucketSelector selectedTask={data} setSelectedTask={setData} handleTaskUpdate={handleTaskUpdate} project={project} />
    )
}

export default UpdateBucket
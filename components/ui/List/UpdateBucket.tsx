"use client"
import BucketSelector from '@/components/ui/BucketSelector';
import { ProjectI, TaskI } from '@/interfaces';
import { useUpdateTaskMutation } from '@/lib/features/taskApi';
import { useState } from 'react';

interface Props {
    currData: TaskI;
    project: ProjectI;
}

const UpdateBucket = ({ currData, project }: Props) => {
    const [data, setData] = useState(currData);

    const [updateTask] = useUpdateTaskMutation();
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
        <BucketSelector selectedTask={data} setSelectedTask={setData} handleTaskUpdate={handleTaskUpdate} />
    )
}

export default UpdateBucket
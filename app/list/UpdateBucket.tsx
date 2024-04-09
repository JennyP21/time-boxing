"use client"
import { TaskI } from '@/interfaces';
import { useUpdateTaskMutation } from '@/lib/features/taskApi';
import { useState } from 'react';
import ListBucket from './ListBucket';

interface Props {
    currData: TaskI;
}

const UpdateBucket = ({ currData }: Props) => {
    const [data, setData] = useState(currData);

    const [updateTask] = useUpdateTaskMutation();
    const handleTaskUpdate = async () => {
        if (currData.bucket_id !== data.bucket_id) {
            await updateTask({
                id: data.id,
                bucket_id: data.bucket_id,
                user_id: data.user_id,
            } as TaskI);
        }
    }

    return (
        <ListBucket data={data} setData={setData} handleTaskUpdate={handleTaskUpdate} />
    )
}

export default UpdateBucket
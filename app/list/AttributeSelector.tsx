"use client"
import { TaskI } from '@/interfaces';
import { useUpdateTaskMutation } from '@/lib/features/taskApi';
import { Select } from '@chakra-ui/react';
import { SyntheticEvent } from 'react';

interface Props {
    data: string[];
    defaultValue: string;
    dataToUpdate: "progress" | "severity";
    task_id: string;
    user_id: string;
}

const AttributeSelector = ({ data, defaultValue, dataToUpdate, task_id, user_id }: Props) => {

    const [updateTask] = useUpdateTaskMutation();

    const handleTaskUpdate = async (e: SyntheticEvent) => {
        const newValue = (e.target as HTMLSelectElement).value;

        if (defaultValue !== newValue) {
            const data = dataToUpdate === "progress" ? {
                id: task_id,
                user_id,
                progress: newValue
            } as TaskI : {
                id: task_id,
                user_id,
                severity: newValue
            } as TaskI;

            await updateTask(data);
        }
    }

    return (
        <Select size="sm" defaultValue={defaultValue} onChange={(e) => handleTaskUpdate(e)}>
            {data.map(item => (
                <option className='p-0' value={item}>{item}</option>
            ))}
        </Select>
    )
}

export default AttributeSelector
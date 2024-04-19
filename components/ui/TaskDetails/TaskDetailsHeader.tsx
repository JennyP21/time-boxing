"use client"
import { TaskI } from '@/interfaces';
import { useUpdateTaskMutation } from '@/lib/features/taskApi';
import { Input, Text } from '@chakra-ui/react';
import { useState } from 'react';
import AssignUserContainer from '../AssignUserContainer';
import LabelDetails from './LabelDetails';

interface Props {
    project_id: string;
    currentTitle: string;
    task_id: string;
}

const TaskDetailsHeader = ({ task_id, currentTitle, project_id }: Props) => {
    const [title, setTitle] = useState(currentTitle);
    const [updateTask] = useUpdateTaskMutation();

    const handleSubmit = async () => {
        if (title !== currentTitle) {
            const data = {
                id: task_id,
                title,
            } as TaskI;
            await updateTask(data);
        }
    };

    return (
        <>
            <Text mb={0.5} fontWeight={"700"}>Tasks</Text>
            <Input
                autoFocus
                className='font-medium'
                placeholder='Name of task'
                defaultValue={title}
                border="none"
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleSubmit}
            />
            <AssignUserContainer project_id={project_id} />
            <LabelDetails task_id={task_id} />
        </>
    )
}

export default TaskDetailsHeader
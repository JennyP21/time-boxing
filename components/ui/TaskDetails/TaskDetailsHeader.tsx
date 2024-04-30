"use client"
import { handleErrors } from '@/components/utils/handleErrors';
import { updateTaskError } from '@/constants';
import { TaskI } from '@/interfaces';
import { useUpdateTaskMutation } from '@/lib/features/taskApi';
import { Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react';
import { useState } from 'react';
import AssignUserContainer from '../AssignUserContainer';
import CheckTask from '../CheckTask';
import LabelDetails from './LabelDetails';

interface Props {
    project_id: string;
    currentTitle: string;
    task: TaskI;
}

const TaskDetailsHeader = ({ task, currentTitle, project_id }: Props) => {
    const [title, setTitle] = useState(currentTitle);
    const [updateTask, { error }] = useUpdateTaskMutation();

    if (error) handleErrors(error, updateTaskError.type);

    const handleSubmit = async () => {
        if (title !== currentTitle) {
            const data = {
                id: task.id,
                title,
            } as TaskI;
            await updateTask(data);
        }
    };

    return (
        <>
            <Text mb={0.5} fontWeight={"700"}>Tasks</Text>
            <InputGroup size="sm">
                <InputLeftElement>
                    <CheckTask task={task} />
                </InputLeftElement>
                <Input
                    autoFocus
                    className='font-medium'
                    placeholder='Name of task'
                    defaultValue={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleSubmit}
                    _focus={{ boxShadow: "none" }}
                />
            </InputGroup>
            <AssignUserContainer project_id={project_id} task_id={task.id} />
            <LabelDetails task_id={task.id} project_id={project_id} />
        </>
    )
}

export default TaskDetailsHeader
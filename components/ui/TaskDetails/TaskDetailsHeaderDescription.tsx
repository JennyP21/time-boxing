import { handleErrors } from '@/components/utils/handleErrors';
import { updateTaskError } from '@/constants';
import { TaskI } from '@/interfaces';
import { useUpdateTaskMutation } from '@/lib/features/taskApi';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { useState } from 'react';
import CheckTask from '../CheckTask';

interface Props {
    currentTitle: string,
    task: TaskI
}

const TaskDetailsHeaderDescription = ({ currentTitle, task }: Props) => {
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
    )
}

export default TaskDetailsHeaderDescription
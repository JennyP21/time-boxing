import { TaskWithUserI } from '@/interfaces';
import Task from './Task';

interface Props {
    data: TaskWithUserI[] | undefined;
}

const TasksList = ({ data }: Props) => {

    return (
        <>
            {data?.map(task => (
                <Task key={task.tasks.id} taskWithUser={task} />
            ))}
        </>
    )
}

export default TasksList
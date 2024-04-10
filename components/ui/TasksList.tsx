import { TaskWithUserI } from '@/interfaces';
import Task from './Task';
import CompletedTask from './CompletedTask';

interface Props {
    data: TaskWithUserI[] | undefined;
}

const TasksList = ({ data }: Props) => {

    if (!data) return null;

    const incompleteTasks = data.filter(item => item.task.progress !== "Completed");
    const completedTasks = data.filter(item => item.task.progress === "Completed");

    return (
        <>
            {incompleteTasks.map(task => (
                <Task key={task.task.id} taskWithUser={task} />
            ))}
            {completedTasks.length > 0 && <CompletedTask data={completedTasks} />}
        </>
    )
}

export default TasksList
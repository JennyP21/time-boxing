import { ProjectI, TaskI } from '@/interfaces';
import CompletedTask from '../CompletedTask';
import Task from './Task';

interface Props {
    data: TaskI[] | undefined;
    project: ProjectI;
}

const TasksList = ({ data, project }: Props) => {
    if (!data) return null;

    const incompleteTasks = data.filter(item => item.progress !== "Completed");
    const completedTasks = data.filter(item => item.progress === "Completed");

    return (
        <>
            {incompleteTasks.map(task => (
                <Task key={task.id} task={task} project={project} />
            ))}
            {completedTasks.length > 0 && <CompletedTask data={completedTasks} project={project} />}
        </>
    )
}

export default TasksList
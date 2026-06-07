import { ProjectI, TaskWithDetailsI } from '@/interfaces';
import CompletedTask from '../CompletedTask';
import Task from './Task';
import { Droppable } from '@hello-pangea/dnd';

interface Props {
    columnId: string;
    data: TaskWithDetailsI[] | undefined;
    project: ProjectI;
}

const TasksList = ({ columnId, data, project }: Props) => {
    if (!data) return null;

    const incompleteTasks = data.filter(item => item.progress !== "Completed");
    const completedTasks = data.filter(item => item.progress === "Completed");

    return (
        <>
            <Droppable droppableId={columnId}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{ display: "flex", flexDirection: "column", gap: "12px", minHeight: "150px", width: "100%" }}
                    >
                        {incompleteTasks.map((task, index) => (
                            <Task key={task.id} task={task} project={project} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            {completedTasks.length > 0 && <CompletedTask data={completedTasks} project={project} />}
        </>
    )
}

export default TasksList
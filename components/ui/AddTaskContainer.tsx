import { addTaskError, assignLabelError } from '@/constants';
import { ProjectI, Task_LabelI, TaskI } from '@/interfaces';
import { useAssignLabelMutation } from '@/lib/features/labelApi';
import { useAddTaskMutation } from '@/lib/features/taskApi';
import { useState } from 'react';
import { handleErrors } from '../utils/handleErrors';
import AddTask from './Kanban/AddKanbanTask';
import AddListTask from './List/AddListTask';

interface Props {
    type: "bucket" | "list";
    bucket_id?: string;
    progress?: string;
    severity?: string;
    label_id?: string;
    project: ProjectI;
}

const AddTaskContainer = ({ type, bucket_id, project, progress, severity, label_id }: Props) => {
    const [active, setActive] = useState(false);

    const [addTask, { error }] = useAddTaskMutation();
    if (error) handleErrors(error, addTaskError.type)

    const [assignLabel, { error: LabelAssignError }] = useAssignLabelMutation();
    if (LabelAssignError) handleErrors(LabelAssignError, assignLabelError.type);

    const initialData = {
        title: "",
        project_id: project.id,
        bucket_id: bucket_id || "",
        progress,
        severity
    };
    const [data, setData] = useState(initialData);

    const handleSubmit = async () => {
        const newTask = await addTask(data as TaskI);
        if (label_id && 'data' in newTask && newTask.data) {
            await assignLabel({
                task_id: newTask.data.id,
                label_id
            } as Task_LabelI);
        }
        setData(initialData);
        setActive(false);
    }

    return (
        <>
            {type === "bucket" &&
                <AddTask
                    data={data as TaskI}
                    setData={setData}
                    active={active}
                    setActive={setActive}
                    hasBucketSelector={bucket_id === undefined}
                    handleSubmit={handleSubmit}
                    project={project}
                />
            }{type === "list" &&
                <AddListTask
                    data={data as TaskI}
                    setData={setData}
                    active={active}
                    setActive={setActive}
                    handleSubmit={handleSubmit}
                    project={project}
                />
            }
        </>
    )
}

export default AddTaskContainer
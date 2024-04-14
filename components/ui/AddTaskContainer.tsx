import { ProjectI, TaskI } from '@/interfaces';
import { useAddTaskMutation } from '@/lib/features/taskApi';
import { useState } from 'react';
import AddTask from './AddTask';
import AddListTask from './List/AddListTask';

interface Props {
    type: "bucket" | "list";
    bucket_id?: string;
    project: ProjectI;
}

const AddTaskContainer = ({ type, bucket_id, project }: Props) => {
    const [active, setActive] = useState(false);
    const [addTask] = useAddTaskMutation();

    const initialData = {
        title: "",
        project_id: project.id,
        bucket_id: bucket_id || "",
    };
    const [data, setData] = useState(initialData);

    const handleSubmit = async () => {
        await addTask(data as TaskI);
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
                    hadBucketSelector={bucket_id === undefined}
                    handleSubmit={handleSubmit}
                />
            }{type === "list" &&
                <AddListTask
                    data={data as TaskI}
                    setData={setData}
                    active={active}
                    setActive={setActive}
                    handleSubmit={handleSubmit}
                />
            }
        </>
    )
}

export default AddTaskContainer
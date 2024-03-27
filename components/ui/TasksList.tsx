import { useGetTasksByBucketQuery } from '@/lib/features/taskApi';
import KanbanTask from './KanbanTask';
import { Spinner } from '@chakra-ui/react';
import { toast } from '@/app/api/Toast';

interface Props {
    bucket_id: string;
}

const TasksList = ({ bucket_id }: Props) => {

    const { data, error, isLoading } = useGetTasksByBucketQuery(bucket_id);

    if (error) toast.error("Something went wrong. Please try again later", {
        toastId: "Task error"
    });

    if (isLoading) return <Spinner />;

    return (
        <>
            {data?.map(task => (
                <KanbanTask key={task.id} task={task} />
            ))}
        </>
    )
}

export default TasksList
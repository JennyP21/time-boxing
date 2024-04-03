import { toast } from '@/components/ui/Toast';
import { useGetTasksByBucketQuery } from '@/lib/features/taskApi';
import { Spinner } from '@chakra-ui/react';
import Task from './Task';

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
                <Task key={task.tasks.id} taskWithUser={task} />
            ))}
        </>
    )
}

export default TasksList
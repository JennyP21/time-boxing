import { toast } from '@/components/error/Toast';
import Stack from '@/components/ui/Stack';
import { ProjectI } from '@/interfaces';
import { useGetTasksByBucketQuery } from '@/lib/features/taskApi';
import AddTask from '../AddTask';
import TasksList from '../TasksList';
import BucketHeader from './BucketHeader';


interface Props {
    id: string;
    name: string;
    project: ProjectI;
}

const Bucket = ({ name, id, project }: Props) => {

    const { data, error } = useGetTasksByBucketQuery(id);

    if (error) toast.error("Something went wrong. Please try again later", {
        toastId: "Task error"
    });

    return (
        <Stack>
            <BucketHeader name={name} id={id} project={project} />
            <AddTask bucket_id={id} />
            <TasksList data={data} />
        </Stack>
    )
}

export default Bucket
import TaskCardLoading from '@/components/loading/TaskCardLoading';
import Stack from '@/components/ui/Kanban/Stack';
import { handleErrors } from '@/components/utils/handleErrors';
import { getTasksByBucketError } from '@/constants';
import { ProjectI } from '@/interfaces';
import { useGetTasksByBucketQuery } from '@/lib/features/taskApi';
import AddTaskContainer from '../../AddTaskContainer';
import TasksList from '../TasksList';
import BucketHeader from './BucketHeader';

interface Props {
    id: string;
    name: string;
    project: ProjectI;
}

const Bucket = ({ name, id, project }: Props) => {

    const { data, error, isLoading } = useGetTasksByBucketQuery(id);

    if (error) handleErrors(error, getTasksByBucketError.type);

    return (
        <Stack>
            <BucketHeader name={name} id={id} project={project} />
            <AddTaskContainer project={project} type='bucket' bucket_id={id} />
            {!isLoading ? <TaskCardLoading /> :
                <TasksList data={data} project={project} />
            }
        </Stack>
    )
}

export default Bucket
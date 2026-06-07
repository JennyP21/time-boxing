import TaskCardLoading from '@/components/loading/TaskCardLoading';
import Stack from '@/components/ui/Kanban/Stack';
import { ProjectI, TaskWithDetailsI } from '@/interfaces';
import AddTaskContainer from '../../AddTaskContainer';
import TasksList from '../TasksList';
import BucketHeader from './BucketHeader';

interface Props {
    id: string;
    name: string;
    project: ProjectI;
    tasks: TaskWithDetailsI[] | undefined;
    isLoading: boolean;
}

const Bucket = ({ name, id, project, tasks, isLoading }: Props) => {
    return (
        <Stack>
            <BucketHeader currentName={name} bucket_id={id} project={project} />
            <AddTaskContainer project={project} type='bucket' bucket_id={id} />
            {isLoading ? <TaskCardLoading /> :
                <TasksList columnId={id} data={tasks} project={project} />
            }
        </Stack>
    )
}

export default Bucket
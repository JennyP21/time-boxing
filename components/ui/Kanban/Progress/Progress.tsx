import TaskCardLoading from '@/components/loading/TaskCardLoading';
import Stack from '@/components/ui/Kanban/Stack';
import { ProjectI, TaskWithDetailsI } from '@/interfaces';
import AddTaskContainer from '../../AddTaskContainer';
import GroupHeader from '../GroupHeader';
import TasksList from '../TasksList';

interface Props {
    progress: string;
    project: ProjectI;
    tasks: TaskWithDetailsI[] | undefined;
    isLoading: boolean;
}

const Progress = ({ progress, project, tasks, isLoading }: Props) => {
    return (
        <Stack>
            <GroupHeader>{progress}</GroupHeader>
            <AddTaskContainer project={project} type='bucket' progress={progress} />
            {isLoading ? <TaskCardLoading />
                :
                <TasksList columnId={progress} data={tasks} project={project} />
            }
        </Stack>
    )
}

export default Progress;
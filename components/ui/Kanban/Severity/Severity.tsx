import TaskCardLoading from '@/components/loading/TaskCardLoading';
import Stack from '@/components/ui/Kanban/Stack';
import { ProjectI, TaskWithDetailsI } from '@/interfaces';
import AddTaskContainer from '../../AddTaskContainer';
import GroupHeader from '../GroupHeader';
import TasksList from '../TasksList';

interface Props {
    severity: string;
    project: ProjectI;
    tasks: TaskWithDetailsI[] | undefined;
    isLoading: boolean;
}

const Severity = ({ severity, project, tasks, isLoading }: Props) => {
    return (
        <Stack>
            <GroupHeader>{severity}</GroupHeader>
            <AddTaskContainer project={project} type='bucket' severity={severity} />
            {isLoading ? <TaskCardLoading /> :
                <TasksList columnId={severity} data={tasks} project={project} />
            }
        </Stack>
    )
}

export default Severity;
import TaskCardLoading from '@/components/loading/TaskCardLoading';
import Stack from '@/components/ui/Kanban/Stack';
import { handleErrors } from '@/components/utils/handleErrors';
import { getTasksError } from '@/constants';
import { ProjectI } from '@/interfaces';
import { useGetTasksByProjectIdQuery } from '@/lib/features/taskApi';
import AddTaskContainer from '../../AddTaskContainer';
import GroupHeader from '../GroupHeader';
import TasksList from '../TasksList';

interface Props {
    severity: string;
    project: ProjectI;
}

const Severity = ({ severity, project }: Props) => {

    const { data: tasks, error, isLoading } = useGetTasksByProjectIdQuery(project.id);

    if (error) handleErrors(error, getTasksError.type);

    const filteredData = tasks?.filter(task => task.severity === severity)

    return (
        <Stack>
            <GroupHeader>{severity}</GroupHeader>
            <AddTaskContainer project={project} type='bucket' severity={severity} />
            {isLoading ? <TaskCardLoading /> :
                <TasksList data={filteredData} project={project} />
            }
        </Stack>
    )
}

export default Severity;
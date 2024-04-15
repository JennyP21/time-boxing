import Stack from '@/components/ui/Kanban/Stack';
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

    const { data: tasks, error } = useGetTasksByProjectIdQuery(project.id);

    const filteredData = tasks?.filter(task => task.severity === severity)

    return (
        <Stack>
            <GroupHeader>{severity}</GroupHeader>
            <AddTaskContainer project={project} type='bucket' />
            <TasksList data={filteredData} project={project} />
        </Stack>
    )
}

export default Severity;
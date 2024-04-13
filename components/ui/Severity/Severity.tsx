import Stack from '@/components/ui/Stack';
import { ProjectI } from '@/interfaces';
import { useGetTasksByProjectIdQuery } from '@/lib/features/taskApi';
import AddTask from '../AddTask';
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
            <AddTask project={project} />
            <TasksList data={filteredData} />
        </Stack>
    )
}

export default Severity;
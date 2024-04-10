import Stack from '@/components/ui/Stack';
import { useGetTasksQuery } from '@/lib/features/taskApi';
import AddTask from '../AddTask';
import GroupHeader from '../GroupHeader';
import TasksList from '../TasksList';

interface Props {
    severity: string;
}

const Severity = ({ severity }: Props) => {

    const { data: tasks, error } = useGetTasksQuery();

    const filteredData = tasks?.filter(task => task.task.severity === severity)

    return (
        <Stack>
            <GroupHeader>{severity}</GroupHeader>
            <AddTask />
            <TasksList data={filteredData} />
        </Stack>
    )
}

export default Severity;
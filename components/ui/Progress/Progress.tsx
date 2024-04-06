import Stack from '@/components/ui/Stack';
import { useGetTasksQuery } from '@/lib/features/taskApi';
import AddTask from '../AddTask';
import GroupHeader from '../GroupHeader';
import TasksList from '../TasksList';

interface Props {
    progress: string;
}

const Progress = ({ progress }: Props) => {

    const { data: tasks } = useGetTasksQuery();

    const filteredData = tasks?.filter(task => task.tasks.progress === progress)

    return (
        <Stack>
            <GroupHeader>{progress}</GroupHeader>
            <AddTask />
            <TasksList data={filteredData} />
        </Stack>
    )
}

export default Progress;
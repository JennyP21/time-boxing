import Stack from '@/components/ui/Stack';
import { useGetTasksByProjectIdQuery } from '@/lib/features/taskApi';
import AddTask from '../AddTask';
import GroupHeader from '../GroupHeader';
import TasksList from '../TasksList';
import { ProjectI } from '@/interfaces';

interface Props {
    progress: string;
    project: ProjectI;
}

const Progress = ({ progress, project }: Props) => {

    const { data: tasks } = useGetTasksByProjectIdQuery(project.id);

    const filteredData = tasks?.filter(task => task.progress === progress)

    return (
        <Stack>
            <GroupHeader>{progress}</GroupHeader>
            <AddTask project={project} />
            <TasksList data={filteredData} />
        </Stack>
    )
}

export default Progress;
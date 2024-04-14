import Stack from '@/components/ui/Stack';
import { ProjectI } from '@/interfaces';
import { useGetTasksByProjectIdQuery } from '@/lib/features/taskApi';
import AddTaskContainer from '../AddTaskContainer';
import GroupHeader from '../GroupHeader';
import TasksList from '../TasksList';

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
            <AddTaskContainer project={project} type='bucket' />
            <TasksList data={filteredData} />
        </Stack>
    )
}

export default Progress;
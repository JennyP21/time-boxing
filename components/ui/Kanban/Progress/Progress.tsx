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
    progress: string;
    project: ProjectI;
}

const Progress = ({ progress, project }: Props) => {

    const { data: tasks, error, isLoading } = useGetTasksByProjectIdQuery(project.id);

    if (error) handleErrors(error, getTasksError.type);

    const filteredData = tasks?.filter(task => task.progress === progress)

    return (
        <Stack>
            <GroupHeader>{progress}</GroupHeader>
            <AddTaskContainer project={project} type='bucket' progress={progress} />
            {isLoading ? <TaskCardLoading />
                :
                <TasksList data={filteredData} project={project} />
            }
        </Stack>
    )
}

export default Progress;
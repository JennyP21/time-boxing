import { handleErrors } from '@/components/utils/handleErrors';
import { getTasksError } from '@/constants';
import { ProjectI } from '@/interfaces';
import { useGetTasksByProjectIdsQuery } from '@/lib/features/taskApi';
import ChartWrapper from './ChartWrapper';

interface Props {
    allProjects: ProjectI[];
}

const GetTasksWrapper = ({ allProjects }: Props) => {
    const { data: tasks, error } = useGetTasksByProjectIdsQuery(allProjects.map(project => project.id));
    if (error) handleErrors(error, getTasksError.type);

    return (
        <ChartWrapper tasks={tasks} />
    )
}

export default GetTasksWrapper
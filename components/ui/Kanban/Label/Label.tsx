import TaskCardLoading from '@/components/loading/TaskCardLoading';
import Stack from '@/components/ui/Kanban/Stack';
import { convertToTaskList } from '@/components/utils';
import { handleErrors } from '@/components/utils/handleErrors';
import { getTasksError } from '@/constants';
import { LabelI, ProjectI } from '@/interfaces';
import { useGetTasksByLabelQuery } from '@/lib/features/taskApi';
import AddTaskContainer from '../../AddTaskContainer';
import GroupHeader from '../GroupHeader';
import TasksList from '../TasksList';

interface Props {
    label: LabelI;
    project: ProjectI;
}

const Label = ({ label, project }: Props) => {

    const { data, error, isLoading } = useGetTasksByLabelQuery({ label_id: label.id, project_id: project.id });

    if (error) handleErrors(error, getTasksError.type);

    const newData = convertToTaskList(data);

    return (
        <Stack>
            <GroupHeader>{label.name}</GroupHeader>
            <AddTaskContainer project={project} type='bucket' label_id={label.id} />
            {isLoading ? <TaskCardLoading /> :
                <TasksList data={newData} project={project} />
            }
        </Stack>
    )
}

export default Label;
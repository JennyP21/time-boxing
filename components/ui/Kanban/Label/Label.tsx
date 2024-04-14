import Stack from '@/components/ui/Kanban/Stack';
import { convertToTaskList } from '@/components/utils';
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

    const { data } = useGetTasksByLabelQuery({ label_id: label.id, project_id: project.id });

    const newData = convertToTaskList(data);

    return (
        <Stack>
            <GroupHeader>{label.name}</GroupHeader>
            <AddTaskContainer project={project} type='bucket' />
            <TasksList data={newData} />
        </Stack>
    )
}

export default Label;
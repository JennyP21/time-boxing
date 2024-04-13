import Stack from '@/components/ui/Stack';
import { LabelI, ProjectI } from '@/interfaces';
import { useGetTasksByLabelQuery } from '@/lib/features/taskApi';
import AddTask from '../AddTask';
import GroupHeader from '../GroupHeader';
import TasksList from '../TasksList';
import { convertToTaskList } from '@/components/utils';

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
            <AddTask project={project} />
            <TasksList data={newData} />
        </Stack>
    )
}

export default Label;
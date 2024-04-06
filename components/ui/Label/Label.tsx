import Stack from '@/components/ui/Stack';
import { LabelI } from '@/interfaces';
import { useGetTasksByLabelQuery } from '@/lib/features/taskApi';
import AddTask from '../AddTask';
import GroupHeader from '../GroupHeader';
import TasksList from '../TasksList';

interface Props {
    label: LabelI;
}

const Label = ({ label }: Props) => {

    const { data } = useGetTasksByLabelQuery(label.id);

    if (!data) return null;

    return (
        <Stack>
            <GroupHeader>{label.name}</GroupHeader>
            <AddTask />
            <TasksList data={data} />
        </Stack>
    )
}

export default Label;
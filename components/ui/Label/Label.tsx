import Stack from '@/components/ui/Stack';
import { LabelI } from '@/interfaces';
import { useGetTasksByLabelQuery } from '@/lib/features/taskApi';
import { Heading } from "@chakra-ui/react";
import AddTask from '../AddTask';
import TasksList from '../TasksList';

interface Props {
    label: LabelI;
}

const Label = ({ label }: Props) => {

    const { data } = useGetTasksByLabelQuery(label.id);

    if (!data) return null;

    return (
        <Stack>
            <Heading textAlign="start" fontWeight="normal" w="100%" size="medium">{label.name}</Heading>
            <AddTask />
            <TasksList data={data} />
        </Stack>
    )
}

export default Label;
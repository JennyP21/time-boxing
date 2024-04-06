import Stack from '@/components/ui/Stack';
import { useGetTasksQuery } from '@/lib/features/taskApi';
import { Heading } from "@chakra-ui/react";
import AddTask from '../AddTask';
import TasksList from '../TasksList';

interface Props {
    progress: string;
}

const Label = ({ progress }: Props) => {

    const { data: tasks } = useGetTasksQuery();

    const filteredData = tasks?.filter(task => task.tasks.progress === progress)

    return (
        <Stack>
            <Heading textAlign="start" fontWeight="normal" w="100%" size="medium">{progress}</Heading>
            <AddTask />
            <TasksList data={filteredData} />
        </Stack>
    )
}

export default Label;
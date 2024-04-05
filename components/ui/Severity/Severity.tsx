import Stack from '@/components/ui/Stack';
import { Heading } from "@chakra-ui/react";
import AddTask from '../AddTask';
import TasksList from '../TasksList';
import { useGetTasksQuery } from '@/lib/features/taskApi';

interface Props {
    severity: string;
}

const Severity = ({ severity }: Props) => {

    const { data: tasks, error } = useGetTasksQuery();

    const filteredData = tasks?.filter(task => task.tasks.severity === severity)

    return (
        <Stack>
            <Heading textAlign="start" fontWeight="normal" w="100%" size="medium">{severity}</Heading>
            <AddTask />
            <TasksList data={filteredData} />
        </Stack>
    )
}

export default Severity;
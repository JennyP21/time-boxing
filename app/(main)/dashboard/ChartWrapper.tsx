import { convertToTasksBySeverity, getTopUpcomingTasks } from '@/components/utils';
import { TaskI } from '@/interfaces';
import TasksBySeverityCount from './TasksBySeverityCount';
import { Flex } from '@chakra-ui/react';
import TasksByDueDate from './TasksByDueDate';

interface Props {
    tasks: TaskI[] | undefined;
}

const ChartWrapper = ({ tasks }: Props) => {
    if (!tasks) return null;
    const tasksBySeverityCount = convertToTasksBySeverity(tasks);
    const topUpcomingTasks = getTopUpcomingTasks(tasks);

    return (
        <Flex className='gap-3 flex-wrap p-3'>
            <TasksBySeverityCount data={tasksBySeverityCount} />
            <TasksByDueDate tasks={topUpcomingTasks} />
        </Flex>
    )
}

export default ChartWrapper
import { getLateTasks, getTopUpcomingTasks, groupByProgressCount, groupBySeverityCount } from '@/components/utils';
import { TaskI } from '@/interfaces';
import { Grid, SimpleGrid } from '@chakra-ui/react';
import TasksBySeverityCount from './TasksBySeverityCount';
import TasksStatus from './TasksStatus';
import TasksTable from './TasksTable';

interface Props {
    tasks: TaskI[] | undefined;
}

const ChartWrapper = ({ tasks }: Props) => {
    if (!tasks) return null;
    const tasksBySeverityCount = groupBySeverityCount(tasks);
    const tasksByProgressCount = groupByProgressCount(tasks);
    const topUpcomingTasks = getTopUpcomingTasks(tasks);
    const topLateTasks = getLateTasks(tasks);

    return (
        <SimpleGrid
            className='p-3 gap-3 flex-[1_0_0]'
            columns={{ base: 1, lg: 2 }}
        >
            <TasksStatus data={tasksByProgressCount} />
            <TasksTable title="Upcoming tasks" tasks={topUpcomingTasks} />
            <TasksBySeverityCount data={tasksBySeverityCount} />
            <TasksTable title="Late tasks" tasks={topLateTasks} />
        </SimpleGrid>
    )
}

export default ChartWrapper
import { getLateTasks, getTopUpcomingTasks, groupByProgressCount, groupBySeverityCount } from '@/components/utils';
import { TaskI } from '@/interfaces';
import { Grid } from '@chakra-ui/react';
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
        <Grid
            className='w-full h-full p-3 gap-3'
            templateColumns={{ base: "1fr", md: "1fr 1fr" }}
        >
            <TasksStatus data={tasksByProgressCount} />
            <TasksTable title="Upcoming tasks" tasks={topUpcomingTasks} />
            <TasksBySeverityCount data={tasksBySeverityCount} />
            <TasksTable title="Late tasks" tasks={topLateTasks} />
        </Grid>
    )
}

export default ChartWrapper
import { getTopUpcomingTasks, groupByProgressCount, groupBySeverityCount } from '@/components/utils';
import { TaskI } from '@/interfaces';
import { Grid } from '@chakra-ui/react';
import TasksByDueDate from './TasksByDueDate';
import TasksBySeverityCount from './TasksBySeverityCount';
import TasksStatus from './TasksStatus';

interface Props {
    tasks: TaskI[] | undefined;
}

const ChartWrapper = ({ tasks }: Props) => {
    if (!tasks) return null;
    const tasksBySeverityCount = groupBySeverityCount(tasks);
    const tasksByProgressCount = groupByProgressCount(tasks);
    const topUpcomingTasks = getTopUpcomingTasks(tasks);

    return (
        <Grid className='p-3 gap-3' templateRows='repeat(2, 1fr)' templateColumns='repeat(2, 1fr)'>
            <TasksStatus data={tasksByProgressCount} />
            <TasksByDueDate tasks={topUpcomingTasks} />
            <TasksBySeverityCount data={tasksBySeverityCount} />
        </Grid>
    )
}

export default ChartWrapper
import { convertToTasksBySeverity } from '@/components/utils';
import { TaskI } from '@/interfaces';
import TasksBySeverityCount from './TasksBySeverityCount';

interface Props {
    tasks: TaskI[] | undefined;
}

const ChartWrapper = ({ tasks }: Props) => {
    if (!tasks) return null;
    const tasksBySeverityCount = convertToTasksBySeverity(tasks);

    return (
        <TasksBySeverityCount data={tasksBySeverityCount} />
    )
}

export default ChartWrapper
import CheckTask from '@/components/ui/CheckTask';
import { taskProgress, taskSeverity } from '@/constants';
import { ProjectI, TaskI } from '@/interfaces';
import { Tbody, Td, Tr } from '@chakra-ui/react';
import _ from "lodash";
import { useSearchParams } from 'next/navigation';
import AddTaskContainer from '../AddTaskContainer';
import AssignUserWrapper from '../AssignUserWrapper';
import MoreOptionsContainer from '../MoreOptionsContainer';
import AttributeSelector from './AttributeSelector';
import DueDate from './DueDate';
import TaskTitle from './TaskTitle';
import UpdateBucket from './UpdateBucket';

interface Props {
    data: TaskI[] | undefined;
    project: ProjectI;
}

const TableBody = ({ data, project }: Props) => {

    const searchParams = useSearchParams();
    const sortBy = searchParams.get("sortBy") as "title" | "progress" | "end_date" | "severity" | null;
    const dir = searchParams.get("dir") as "asc" | "desc" | null;

    const sortedData = sortBy && dir ? _.orderBy(data, function (item) {
        return item[sortBy];
    }, dir) : data;

    return (
        <Tbody>
            {sortedData?.map(task => (
                <Tr key={task.id}>
                    <Td px={3}>
                        <CheckTask task={task} />
                    </Td>
                    <Td p={1} overflow="clip">
                        <TaskTitle task={task} />
                    </Td>
                    <Td py={0} px={1}>
                        <AssignUserWrapper project_id={project.id} task_id={task.id} />
                    </Td>
                    <Td p={1}>
                        <UpdateBucket currData={task} project={project} />
                    </Td>
                    <Td p={1}>
                        <AttributeSelector
                            dataToUpdate='progress'
                            task_id={task.id}
                            defaultValue={task.progress}
                            data={taskProgress}
                        />
                    </Td>
                    <Td p={1}>
                        <AttributeSelector
                            dataToUpdate='severity'
                            task_id={task.id}
                            defaultValue={task.severity}
                            data={taskSeverity}
                        />
                    </Td>
                    <Td p={1}>
                        <DueDate
                            task_id={task.id}
                            currDueDate={task.end_date}
                        />
                    </Td>
                    <Td p={1} position="relative">
                        <MoreOptionsContainer task={task} align="center" project={project} />
                    </Td>
                </Tr>
            ))}
            <AddTaskContainer project={project} type='list' />
        </Tbody>
    )
}

export default TableBody
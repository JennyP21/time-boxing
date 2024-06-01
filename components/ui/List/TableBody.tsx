import CheckTask from '@/components/ui/CheckTask';
import { ProjectI, TaskI } from '@/interfaces';
import { Tbody, Td, Tr } from '@chakra-ui/react';
import _ from "lodash";
import { useSearchParams } from 'next/navigation';
import AddTaskContainer from '../AddTaskContainer';
import UserAssignmentContainer from '../UserAssignmentContainer';
import MoreOptionsContainer from '../MoreOptionsContainer';
import UpdateProgress from '../UpdateProgress';
import UpdateSeverity from '../UpdateSeverity';
import TaskTitle from './TaskTitle';
import UpdateBucket from './UpdateBucket';
import UpdateDueDateContainer from './UpdateDueDateContainer';

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
                    <Td>
                        <CheckTask task={task} />
                    </Td>
                    <Td overflow="clip">
                        <TaskTitle task={task} />
                    </Td>
                    <Td>
                        <UserAssignmentContainer project_id={project.id} task_id={task.id} />
                    </Td>
                    <Td>
                        <UpdateBucket currData={task} project={project} />
                    </Td>
                    <Td>
                        <UpdateProgress task_id={task.id} currProgress={task.progress} selectSize='sm' withLabel={false} />
                    </Td>
                    <Td>
                        <UpdateSeverity task_id={task.id} currSeverity={task.severity} selectSize='sm' withLabel={false} />
                    </Td>
                    <Td>
                        <UpdateDueDateContainer
                            task_id={task.id}
                            currDueDate={task.end_date}
                            currStartDate={task.start_date}
                        />
                    </Td>
                    <Td position="relative">
                        <MoreOptionsContainer task={task} align="center" project={project} />
                    </Td>
                </Tr>
            ))}
            <AddTaskContainer project={project} type='list' />
        </Tbody>
    )
}

export default TableBody
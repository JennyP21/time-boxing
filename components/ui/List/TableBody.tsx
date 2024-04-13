import AssignUserToTask from '@/components/ui/AssignUserToTask';
import CompleteTask from '@/components/ui/CompleteTask';
import { taskProgress, taskSeverity } from '@/constants';
import { TaskWithUserI } from '@/interfaces';
import { Tbody, Td, Tr } from '@chakra-ui/react';
import AddListTask from './AddListTask';
import AttributeSelector from './AttributeSelector';
import DueDate from './DueDate';
import MoreOptions from './MoreOptions';
import TaskTitle from './TaskTitle';
import UpdateBucket from './UpdateBucket';
import { useSearchParams } from 'next/navigation';
import _ from "lodash";

interface Props {
    data: TaskWithUserI[] | undefined;
}

const TableBody = ({ data }: Props) => {

    const searchParams = useSearchParams();
    const sortBy = searchParams.get("sortBy") as "title" | "progress" | "end_date" | "severity" | null;
    const dir = searchParams.get("dir") as "asc" | "desc" | null;

    const sortedData = sortBy && dir ? _.orderBy(data, function (item) {
        return item.task[sortBy];
    }, dir) : data;

    return (
        <Tbody>
            {sortedData?.map(item => (
                <Tr key={item.task.id}>
                    <Td px={3}>
                        <CompleteTask task={item.task} />
                    </Td>
                    <Td p={1} overflow="clip">
                        <TaskTitle taskWithUser={item} />
                    </Td>
                    <Td py={0} px={1}>
                        <AssignUserToTask image={item.user.image} name={item.user.name} />
                    </Td>
                    <Td p={1}>
                        <UpdateBucket currData={item.task} />
                    </Td>
                    <Td p={1}>
                        <AttributeSelector
                            dataToUpdate='progress'
                            task_id={item.task.id}
                            user_id={item.user.id}
                            defaultValue={item.task.progress}
                            data={taskProgress}
                        />
                    </Td>
                    <Td p={1}>
                        <AttributeSelector
                            dataToUpdate='severity'
                            task_id={item.task.id}
                            user_id={item.user.id}
                            defaultValue={item.task.severity}
                            data={taskSeverity}
                        />
                    </Td>
                    <Td p={1}>
                        <DueDate
                            task_id={item.task.id}
                            user_id={item.user.id}
                            currDueDate={item.task.end_date}
                        />
                    </Td>
                    <Td p={1}>
                        <MoreOptions task={item.task} />
                    </Td>
                </Tr>
            ))}
            <AddListTask />
        </Tbody>
    )
}

export default TableBody
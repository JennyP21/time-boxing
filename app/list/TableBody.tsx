import AssignUserToTask from '@/components/ui/AssignUserToTask';
import { taskProgress, taskSeverity } from '@/constants';
import { TaskWithUserI } from '@/interfaces';
import { Checkbox, Tbody, Td, Tr } from '@chakra-ui/react';
import AddListTask from './AddListTask';
import AttributeSelector from './AttributeSelector';
import DueDate from './DueDate';
import MoreOptions from './MoreOptions';
import TaskTitle from './TaskTitle';
import ListBucket from './ListBucket';
import UpdateBucket from './UpdateBucket';

interface Props {
    data: TaskWithUserI[] | undefined;
}

const TableBody = ({ data }: Props) => {
    return (
        <Tbody>
            {data?.map(item => (
                <Tr key={item.tasks.id}>
                    <Td px={3}>
                        <Checkbox />
                    </Td>
                    <Td px={1} overflow="clip">
                        <TaskTitle taskWithUser={item} />
                    </Td>
                    <Td py={0} px={1}>
                        <AssignUserToTask image={item.user.image} name={item.user.name} />
                    </Td>
                    <Td p={1}>
                        <UpdateBucket currData={item.tasks} />
                    </Td>
                    <Td px={1}>
                        <AttributeSelector
                            dataToUpdate='progress'
                            task_id={item.tasks.id}
                            user_id={item.user.id}
                            defaultValue={item.tasks.progress}
                            data={taskProgress}
                        />
                    </Td>
                    <Td px={1}>
                        <AttributeSelector
                            dataToUpdate='severity'
                            task_id={item.tasks.id}
                            user_id={item.user.id}
                            defaultValue={item.tasks.severity}
                            data={taskSeverity}
                        />
                    </Td>
                    <Td px={1}>
                        <DueDate
                            task_id={item.tasks.id}
                            user_id={item.user.id}
                            currDueDate={item.tasks.end_date}
                        />
                    </Td>
                    <Td p={1}>
                        <MoreOptions />
                    </Td>
                </Tr>
            ))}
            <AddListTask />
        </Tbody>
    )
}

export default TableBody
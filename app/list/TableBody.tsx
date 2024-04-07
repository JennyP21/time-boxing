import { TaskWithUserI } from '@/interfaces';
import { Checkbox, Tbody, Td, Tr } from '@chakra-ui/react';
import TaskTitle from './TaskTitle';
import AssignUserToTask from '@/components/ui/AssignUserToTask';
import AttributeSelector from './AttributeSelector';
import { taskProgress, taskSeverity } from '@/constants';

interface Props {
    data: TaskWithUserI[] | undefined;
}

const TableBody = ({ data }: Props) => {
    return (
        <Tbody>
            {data?.map(item => (
                <Tr key={item.tasks.id}>
                    <Td>
                        <Checkbox />
                    </Td>
                    <Td px={1} overflow="clip">
                        <TaskTitle taskWithUser={item} />
                    </Td>
                    <Td py={0} px={1}>
                        <AssignUserToTask image={item.user.image} name={item.user.name} />
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
                    <Td px={1}>{item.tasks.end_date}</Td>
                    <Td px={1}>{item.tasks.bucket_id}</Td>
                </Tr>
            ))}
        </Tbody>
    )
}

export default TableBody
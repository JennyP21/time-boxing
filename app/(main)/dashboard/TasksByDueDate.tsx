import { TaskI } from '@/interfaces';
import { Flex, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import ChartHeading from './ChartHeading';

interface Props {
    tasks: TaskI[];
}

const TasksByDueDate = ({ tasks }: Props) => {
    return (
        <Flex className='flex-col rounded-lg' width={300} border='1px' borderColor='gray.300'>
            <ChartHeading>Top Upcoming tasks</ChartHeading>
            <Table size="md">
                <Thead>
                    <Tr>
                        <Th p={3}>Name</Th>
                        <Th p={3}>Due Date</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {tasks.map(task => (
                        <Tr key={task.id}>
                            <Td p={3} textAlign="start">{task.title}</Td>
                            <Td p={3} textAlign="start">{task.end_date}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Flex>
    )
}

export default TasksByDueDate
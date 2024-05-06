import { TaskI } from '@/interfaces';
import { Flex, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import ChartHeading from './ChartHeading';
import { Link } from '@chakra-ui/next-js';

interface Props {
    tasks: TaskI[];
}

const TasksByDueDate = ({ tasks }: Props) => {
    const today = new Date();
    return (
        <Flex className='flex-col rounded-lg' border='1px' borderColor='gray.300'>
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
                            <Td p={3} textAlign="start">
                                <Link href={`/project/${task.project_id}`}>
                                    {task.title}
                                </Link>
                            </Td>
                            <Td p={3} textAlign="start" color={today > new Date(task.end_date) ? "red.500" : "black"}>{task.end_date}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Flex>
    )
}

export default TasksByDueDate
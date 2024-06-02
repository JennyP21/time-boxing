import { TaskBySeverityCount } from '@/interfaces';
import { Flex } from '@chakra-ui/react';
import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, XAxis } from 'recharts';
import ChartHeading from './ChartHeading';

interface Props {
    data: TaskBySeverityCount[];
}

const severityColorMap = {
    "Low": '#38A169',
    "Medium": '#3182CE',
    "High": '#D69E2E',
    "Urgent": '#E53E3E'
}

const TasksBySeverityCount = ({ data }: Props) => {
    return (
        <Flex className='flex-col items-center gap-5 rounded-lg' border='1px' borderColor='gray.300'>
            <ChartHeading>Count of tasks by severity</ChartHeading>
            <ResponsiveContainer>
                <BarChart data={data}>
                    <XAxis dataKey='severity' />
                    <Bar dataKey='taskCount' barSize={30}>
                        <LabelList dataKey='taskCount' position='insideTop' fill='#fff' />
                        {
                            data.map(item => (
                                <Cell key={item.severity} fill={severityColorMap[item.severity]} />
                            ))
                        }
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </Flex>
    )
}

export default TasksBySeverityCount
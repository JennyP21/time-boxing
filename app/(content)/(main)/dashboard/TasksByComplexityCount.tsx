import { TaskByComplexityCount } from '@/interfaces';
import { Flex } from '@chakra-ui/react';
import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, XAxis } from 'recharts';
import ChartHeading from './ChartHeading';

interface Props {
    data: TaskByComplexityCount[];
}

const complexityColorMap: { [key: string]: string } = {
    "1 - Easy": '#38A169',
    "2 - Low-Med": '#00B5D8',
    "3 - Medium": '#3182CE',
    "4 - High-Med": '#DD6B20',
    "5 - Complex": '#805AD5'
};

const TasksByComplexityCount = ({ data }: Props) => {
    return (
        <Flex className='flex-col h-full items-center gap-5 rounded-lg max-md:min-h-64' border='1px' borderColor='gray.300' py={3} px={2}>
            <ChartHeading>Count of tasks by complexity</ChartHeading>
            <ResponsiveContainer>
                <BarChart data={data}>
                    <XAxis dataKey='complexity' tick={{ fontSize: '10px' }} />
                    <Bar dataKey='taskCount' barSize={35}>
                        <LabelList dataKey='taskCount' position='outside' fill='#000' />
                        {
                            data.map(item => (
                                <Cell key={item.complexity} fill={complexityColorMap[item.complexity] || '#3182CE'} />
                            ))
                        }
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </Flex>
    )
}

export default TasksByComplexityCount;

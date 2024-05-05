"use client"
import { TaskBySeverityCount } from '@/interfaces';
import { Flex, Heading } from '@chakra-ui/react';
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis } from 'recharts';

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
        <Flex className='flex-col items-center gap-5 m-3 rounded-lg' border='1px' borderColor='gray.300' w={400} h={300}>
            <Heading className='text-center w-full border-b py-1' size='md' color='teal' borderColor='gray.300'>Count of tasks by severity</Heading>
            <ResponsiveContainer className='-translate-x-5'>
                <BarChart data={data}>
                    <XAxis dataKey='severity' />
                    <YAxis />
                    <Bar dataKey='taskCount' barSize={30}>
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
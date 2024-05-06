import { TaskByProgressCount } from "@/interfaces";
import { Flex } from "@chakra-ui/react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import ChartHeading from "./ChartHeading";

interface Props {
    data: TaskByProgressCount[]
}

const COLORS = {
    "Not Started": '#718096',
    "In Progress": '#3182CE',
    "On Hold": '#D69E2E',
    "Completed": '#38A169'
};

const TasksStatus = ({ data }: Props) => {
    return (
        <Flex className='flex-col items-center gap-5 rounded-lg' border='1px' borderColor='gray.300'>
            <ChartHeading>Tasks Status</ChartHeading>
            <ResponsiveContainer>
                <PieChart width={400} height={400} className='mx-auto'>
                    <Tooltip />
                    <Legend verticalAlign='top' iconSize={10} height={36} />
                    <Pie data={data} dataKey="taskCount" nameKey="progress" innerRadius={70} outerRadius={100}>
                        {data.map(item => (
                            <Cell key={item.progress} fill={COLORS[item.progress]} />
                        ))
                        }
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </Flex>
    )
}

export default TasksStatus
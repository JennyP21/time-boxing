"use client"
import { TaskAttributesProps } from '@/interfaces';
import { Grid } from '@chakra-ui/react';
import UpdateEndDate from '../UpdateEndDate';
import UpdateProgress from '../UpdateProgress';
import UpdateSeverity from '../UpdateSeverity';
import UpdateStartDate from './UpdateStartDate';

const TaskAttributes = ({ start_date, end_date, severity, progress, task_id }: TaskAttributesProps) => {
    return (
        <Grid templateAreas={{
            base: `"item1" "item2" "item3" "item4"`,
            md: `"item1 item2" "item3 item4"`
        }} gap={2}>
            <UpdateStartDate task_id={task_id} start_date={start_date} end_date={end_date} />
            <UpdateEndDate task_id={task_id} currStartDate={start_date} currEndDate={end_date} withLabel />
            <UpdateSeverity task_id={task_id} currSeverity={severity} selectSize='md' withLabel />
            <UpdateProgress task_id={task_id} currProgress={progress} selectSize='md' withLabel />
        </Grid>
    )
}

export default TaskAttributes
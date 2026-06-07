"use client"
import { TaskAttributesProps } from '@/interfaces';
import { Grid } from '@chakra-ui/react';
import UpdateEndDate from '../UpdateEndDate';
import UpdateProgress from '../UpdateProgress';
import UpdateStartDate from './UpdateStartDate';
import UpdateEntitlementScore from '../UpdateEntitlementScore';

const TaskAttributes = ({ start_date, end_date, progress, entitlementScore, task_id }: TaskAttributesProps) => {
    return (
        <Grid templateAreas={{
            base: `"item1" "item2" "item3" "item4"`,
            md: `"item1 item2" "item3 item4"`
        }} gap={2}>
            <UpdateStartDate task_id={task_id} start_date={start_date} end_date={end_date} />
            <UpdateEndDate task_id={task_id} currStartDate={start_date} currEndDate={end_date} withLabel />
            <UpdateProgress task_id={task_id} currProgress={progress} selectSize='md' withLabel />
            <UpdateEntitlementScore task_id={task_id} currScore={entitlementScore} selectSize='md' withLabel />
        </Grid>
    )
}

export default TaskAttributes
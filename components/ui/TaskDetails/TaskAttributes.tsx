"use client"
import { adjustDates } from '@/components/utils';
import { handleErrors } from '@/components/utils/handleErrors';
import { taskProgress, taskSeverity, updateTaskError } from '@/constants';
import { TaskAttributesProps, TaskI } from '@/interfaces';
import { useUpdateTaskMutation } from '@/lib/features/taskApi';
import { Grid, Input } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import AttributeContainer from './AttributeContainer';
import TaskSelect from './TaskSelect';

const TaskAttributes = ({ start_date, end_date, severity, progress, task_id }: TaskAttributesProps) => {
    const [startDate, setStartDate] = useState(start_date);
    const [endDate, setEndDate] = useState(end_date);
    const [newSeverity, setNewSeverity] = useState(severity);
    const [newProgress, setNewProgress] = useState(progress);
    type DataToUpdate = "start_date" | "end_date" | "severity" | "progress";

    const [updateTask, { error }] = useUpdateTaskMutation();

    if (error) handleErrors(error, updateTaskError.type);

    const handleSubmit = async (dataToUpdate: DataToUpdate) => {
        let newData = {} as { start_date?: string, end_date?: string, severity?: string, progress?: string };
        if (dataToUpdate === "start_date" && startDate !== start_date) {
            if (end_date) {
                const [start_date, end_date] = adjustDates(startDate, endDate, "start");
                newData = { start_date, end_date };
            } else {
                newData = { start_date: startDate };
            }
        } else if (dataToUpdate === "end_date" && endDate !== end_date) {
            if (start_date) {
                const [start_date, end_date] = adjustDates(startDate, endDate, "end");
                newData = { start_date, end_date };
            } else {
                newData = { end_date: endDate };
            }
        } else if (dataToUpdate === "severity" && newSeverity !== severity) {
            newData = { severity: newSeverity };
        } else if (dataToUpdate === "progress" && newProgress !== progress) {
            newData = { progress: newProgress };
        }
        if (!isEmpty(newData)) {
            await updateTask({ id: task_id, ...newData } as TaskI);
        }
    }

    return (
        <Grid templateAreas={{
            base: `"item1" "item2" "item3" "item4"`,
            md: `"item1 item2" "item3 item4"`
        }} gap={2}>
            <AttributeContainer name="Start Date">
                <Input type="date" placeholder='Start Date' defaultValue={start_date} onBlur={() => handleSubmit("start_date")} onChange={(e) => setStartDate(e.target.value)} />
            </AttributeContainer>
            <AttributeContainer name="End Date">
                <Input type="date" placeholder='Start Date' defaultValue={end_date} onBlur={() => handleSubmit("end_date")} onChange={(e) => setEndDate(e.target.value)} />
            </AttributeContainer>
            <AttributeContainer name="Severity">
                <TaskSelect handleSubmit={handleSubmit} type="severity" setData={setNewSeverity} defaultValue={severity} options={taskSeverity} />
            </AttributeContainer>
            <AttributeContainer name="Progress">
                <TaskSelect handleSubmit={handleSubmit} type="progress" setData={setNewProgress} defaultValue={progress} options={taskProgress} />
            </AttributeContainer>
        </Grid>
    )
}

export default TaskAttributes
"use client"
import { taskProgress, taskSeverity } from '@/constants';
import { TaskAttributesProps, TaskI } from '@/interfaces';
import { useUpdateTaskMutation } from '@/lib/features/taskApi';
import { Grid, Input } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import Attribute from './Attribute';
import TaskSelect from './TaskSelect';

const TaskAttributes = ({ start_date, end_date, severity, progress, task_id, user_id }: TaskAttributesProps) => {
    const [startDate, setStartDate] = useState(start_date);
    const [endDate, setEndDate] = useState(end_date);
    const [newSeverity, setNewSeverity] = useState(severity);
    const [newProgress, setNewProgress] = useState(progress);
    type DataToUpdate = "start_date" | "end_date" | "severity" | "progress";

    const [updateTask] = useUpdateTaskMutation();

    const handleSubmit = async (dataToUpdate: DataToUpdate) => {
        let newData = {};
        if (dataToUpdate === "start_date" && startDate !== start_date) {
            newData = { start_date: startDate };
        } else if (dataToUpdate === "end_date" && endDate !== end_date) {
            newData = { end_date: endDate };
        } else if (dataToUpdate === "severity" && newSeverity !== severity) {
            newData = { severity: newSeverity };
        } else if (dataToUpdate === "progress" && newProgress !== progress) {
            newData = { progress: newProgress };
        }
        if (!isEmpty(newData)) {
            await updateTask({ id: task_id, user_id, ...newData } as TaskI);
        }
    }

    return (
        <Grid templateAreas={{
            base: `"item1" "item2" "item3" "item4"`,
            md: `"item1 item2" "item3 item4"`
        }} gap={2}>
            <Attribute name="Start Date">
                <Input type="date" placeholder='Start Date' defaultValue={start_date} onBlur={() => handleSubmit("start_date")} onChange={(e) => setStartDate(e.target.value)} />
            </Attribute>
            <Attribute name="End Date">
                <Input type="date" placeholder='Start Date' defaultValue={end_date} onBlur={() => handleSubmit("end_date")} onChange={(e) => setEndDate(e.target.value)} />
            </Attribute>
            <Attribute name="Severity">
                <TaskSelect handleSubmit={handleSubmit} type="severity" setData={setNewSeverity} defaultValue={severity} options={taskSeverity} />
            </Attribute>
            <Attribute name="Progress">
                <TaskSelect handleSubmit={handleSubmit} type="progress" setData={setNewProgress} defaultValue={progress} options={taskProgress} />
            </Attribute>
        </Grid>
    )
}

export default TaskAttributes
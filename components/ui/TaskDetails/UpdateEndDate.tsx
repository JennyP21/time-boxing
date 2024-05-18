"use client"
import { adjustDates } from '@/components/utils'
import { handleErrors } from '@/components/utils/handleErrors'
import { updateTaskError } from '@/constants'
import { TaskI } from '@/interfaces'
import { useUpdateTaskMutation } from '@/lib/features/taskApi'
import { Input } from '@chakra-ui/react'
import { useState } from 'react'
import AttributeContainer from './AttributeContainer'

interface Props {
    task_id: string;
    start_date: string;
    end_date: string;
}

const UpdateEndDate = ({ task_id, start_date, end_date }: Props) => {
    const [endDate, setEndDate] = useState(end_date);
    const [updateTask, { error }] = useUpdateTaskMutation();
    if (error) handleErrors(error, updateTaskError.type);

    const handleSubmit = async () => {
        const [start, end] = adjustDates(start_date, endDate, "end");
        const data = { id: task_id, start_date: start ?? undefined, end_date: end };
        await updateTask(data as TaskI);
    };

    return (
        <AttributeContainer name="End Date">
            <Input type="date" placeholder='End Date' defaultValue={end_date} onBlur={handleSubmit} onChange={(e) => setEndDate(e.target.value)} />
        </AttributeContainer>
    )
}

export default UpdateEndDate
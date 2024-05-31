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

const UpdateStartDate = ({ task_id, start_date, end_date }: Props) => {
    const [startDate, setStartDate] = useState(start_date);
    const [updateTask, { error }] = useUpdateTaskMutation();
    if (error) handleErrors(error, updateTaskError.type);

    const handleSubmit = async () => {
        const [start, end] = adjustDates(startDate, end_date, "start");
        const data = { id: task_id, start_date: start, end_date: end ?? undefined } as TaskI;
        await updateTask(data);
    };

    return (
        <AttributeContainer name="Start Date">
            <Input type="date" placeholder='Start Date' defaultValue={start_date} onBlur={handleSubmit} onChange={(e) => setStartDate(e.target.value)} />
        </AttributeContainer>
    )
}

export default UpdateStartDate
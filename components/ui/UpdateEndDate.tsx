import { adjustDates } from '@/components/utils'
import { handleErrors } from '@/components/utils/handleErrors'
import { updateTaskError } from '@/constants'
import { TaskI } from '@/interfaces'
import { useUpdateTaskMutation } from '@/lib/features/taskApi'
import { Input } from '@chakra-ui/react'
import { useState } from 'react'
import AttributeContainer from './TaskDetails/AttributeContainer'

interface Props {
    task_id: string;
    currStartDate: string;
    currEndDate: string;
    withLabel: boolean;
}

const UpdateEndDate = ({ task_id, currStartDate, currEndDate, withLabel }: Props) => {
    const [endDate, setEndDate] = useState(currEndDate);
    const [updateTask, { error }] = useUpdateTaskMutation();
    if (error) handleErrors(error, updateTaskError.type);

    const handleSubmit = async () => {
        const [start, end] = adjustDates(currStartDate, endDate, "end");
        const data = { id: task_id, start_date: start ?? undefined, end_date: end };
        await updateTask(data as TaskI);
    };

    return (
        <>
            {withLabel ?
                <AttributeContainer name="End Date">
                    <Input type="date" placeholder='End Date' defaultValue={currEndDate} onBlur={handleSubmit} onChange={(e) => setEndDate(e.target.value)} />
                </AttributeContainer>
                :
                <Input type="date" placeholder='End Date' defaultValue={currEndDate} onBlur={handleSubmit} onChange={(e) => setEndDate(e.target.value)} />
            }
        </>
    )
}

export default UpdateEndDate
import { TaskI } from '@/interfaces'
import { ModalBody, RadioGroup, Stack } from '@chakra-ui/react'
import StepsContainer from './StepsContainer'
import TaskAttributes from './TaskAttributes'
import TaskNote from './TaskNote'

const TaskDetailsBody = ({ task }: { task: TaskI }) => {
    const { id, start_date, end_date, progress, severity, showOnTask, note } = task;

    return (
        <ModalBody py={0}>
            <Stack textAlign="left" bg="white" width="100%" justifyContent="center">
                <TaskAttributes task_id={id} start_date={start_date} end_date={end_date} progress={progress} severity={severity} />
                <RadioGroup defaultValue={showOnTask}>
                    <TaskNote task_id={id} note={note} />
                    <StepsContainer task_id={id} />
                </RadioGroup>
            </Stack>
        </ModalBody>
    )
}

export default TaskDetailsBody
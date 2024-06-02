import { handleErrors } from '@/components/utils/handleErrors';
import { updateTaskError } from '@/constants';
import { TaskI } from '@/interfaces';
import { useUpdateTaskMutation } from '@/lib/features/taskApi';
import { Flex, Progress, Radio, Text } from '@chakra-ui/react';

interface Props {
    totalSteps: number;
    checkedSteps: number;
    task_id: string;
}

const StepsProgress = ({ task_id, totalSteps, checkedSteps }: Props) => {
    const [updateTask, { error }] = useUpdateTaskMutation();
    if (error) handleErrors(error, updateTaskError.type);

    const handleShowOnCard = async () => {
        const data = { showOnTask: "steps", id: task_id } as TaskI;
        await updateTask(data);
    }

    const progress = (checkedSteps / totalSteps) * 100;

    return (
        <Flex className='w-full items-center justify-between gap-3' fontSize="small">
            <Text>{`Checklist ${checkedSteps} / ${totalSteps}`}</Text>
            <Progress className='flex-1 rounded-full' size="sm" value={progress} />
            <Radio my={1} size={"md"} colorScheme='blue' value='steps' onChange={handleShowOnCard}>
                <Text fontSize={"small"}>Show on card</Text>
            </Radio>
        </Flex>
    )
}

export default StepsProgress
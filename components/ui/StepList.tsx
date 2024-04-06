import { toast } from "@/components/error/Toast";
import { useGetStepsByTaskIdQuery } from "@/lib/features/stepsApi";
import { useUpdateTaskMutation } from "@/lib/features/taskApi";
import { Box, HStack, Radio, Text } from "@chakra-ui/react";
import StepsDetails from "./StepsDetails";
import { TaskI } from "@/interfaces";
import { getStepsError } from "@/constants";

interface Props {
    task_id: string;
    user_id: string;
}

const StepList = ({ task_id, user_id }: Props) => {

    const [updateTask] = useUpdateTaskMutation();
    const handleShowOnCard = async () => {
        const data = { showOnTask: "steps", id: task_id, user_id } as TaskI;
        await updateTask(data);
    }

    const { data, error } = useGetStepsByTaskIdQuery(task_id);

    if (error)
        return toast.error(getStepsError.message, { toastId: getStepsError.type });

    if (!data) return null;

    return (
        <Box my={2}>
            <HStack justifyContent="space-between" fontSize="small">
                <Text>{`Checklist ${data.length} / 20`}</Text>
                <Radio my={1} size={"md"} colorScheme='blue' value='steps' onChange={handleShowOnCard}><Text fontSize={"small"}>Show on card</Text></Radio>
            </HStack>
            <StepsDetails steps={data} task_id={task_id} showMinimumVersion={false} />
        </Box>
    )
}

export default StepList
import StepsLoading from "@/components/loading/StepsLoading";
import { handleErrors } from "@/components/utils/handleErrors";
import { getStepsError, updateTaskError } from "@/constants";
import { TaskI } from "@/interfaces";
import { useGetStepsByTaskIdQuery } from "@/lib/features/stepsApi";
import { useUpdateTaskMutation } from "@/lib/features/taskApi";
import { Box, HStack, Radio, Text } from "@chakra-ui/react";
import StepsDetails from "./StepsDetails";

const StepList = ({ task_id }: { task_id: string }) => {

    const [updateTask, { error: taskUpdateError }] = useUpdateTaskMutation();

    if (taskUpdateError) handleErrors(taskUpdateError, updateTaskError.type);

    const handleShowOnCard = async () => {
        const data = { showOnTask: "steps", id: task_id } as TaskI;
        await updateTask(data);
    }

    const { data, error, isLoading } = useGetStepsByTaskIdQuery(task_id);

    if (error) handleErrors(error, getStepsError.type);

    return (
        <>
            {isLoading ?
                <StepsLoading />
                :
                (data && <Box my={2}>
                    <HStack justifyContent="space-between" fontSize="small">
                        <Text>{`Checklist ${data.length} / 20`}</Text>
                        <Radio my={1} size={"md"} colorScheme='blue' value='steps' onChange={handleShowOnCard}><Text fontSize={"small"}>Show on card</Text></Radio>
                    </HStack>
                    <StepsDetails steps={data} task_id={task_id} showMinimumVersion={false} />
                </Box>)
            }
        </>
    )
}

export default StepList
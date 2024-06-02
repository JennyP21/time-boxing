import StepsLoading from "@/components/loading/StepsLoading";
import { handleErrors } from "@/components/utils/handleErrors";
import { getStepsError } from "@/constants";
import { useGetStepsByTaskIdQuery } from "@/lib/features/stepsApi";
import { Box } from "@chakra-ui/react";
import Steps from "./Steps";
import StepsProgress from "./StepsProgress";

const StepsContainer = ({ task_id }: { task_id: string }) => {
    const { data: steps, error, isLoading } = useGetStepsByTaskIdQuery(task_id);
    if (error) handleErrors(error, getStepsError.type);

    return (
        <>
            {isLoading ?
                <StepsLoading />
                :
                (steps &&
                    <Box my={2}>
                        <StepsProgress
                            task_id={task_id}
                            totalSteps={steps.length}
                            checkedSteps={steps.filter(step => step.checked === true).length}
                        />
                        <Steps steps={steps} task_id={task_id} />
                    </Box>
                )
            }
        </>
    )
}

export default StepsContainer
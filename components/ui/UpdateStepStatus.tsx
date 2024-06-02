import { StepsI } from '@/interfaces';
import { Checkbox } from '@chakra-ui/react';
import { BaseQueryFn, TypedMutationTrigger } from '@reduxjs/toolkit/query/react';

interface Props {
    task_id: string;
    step_id: string;
    checked: boolean;
    updateStep: TypedMutationTrigger<StepsI, StepsI, BaseQueryFn>;
}

const UpdateStepStatus = ({ step_id, task_id, checked, updateStep }: Props) => {
    const handleUpdateStepStatus = async () => {
        const data = {
            id: step_id,
            task_id,
            checked: !checked
        } as StepsI;
        await updateStep(data);
    }

    return (
        <Checkbox id={step_id} size={"md"} colorScheme='blue' defaultChecked={checked} onChange={handleUpdateStepStatus} />
    )
}

export default UpdateStepStatus
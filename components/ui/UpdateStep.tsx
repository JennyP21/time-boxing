import { StepsI } from '@/interfaces';
import { Input } from '@chakra-ui/react';
import { BaseQueryFn, TypedMutationTrigger } from '@reduxjs/toolkit/query/react';
import { SyntheticEvent } from 'react';

interface Props {
    step_id: string;
    task_id: string;
    step: StepsI;
    updateStep: TypedMutationTrigger<StepsI, StepsI, BaseQueryFn>;
}

const UpdateStep = ({ step, updateStep, task_id, step_id }: Props) => {
    const handleUpdateStep = async (e: SyntheticEvent) => {
        e.preventDefault();
        const value = (e.target as HTMLInputElement).value;
        if (value) {
            const data = {
                id: step_id,
                task_id,
                value,
            } as StepsI;
            await updateStep(data);
        }
    }

    return (
        <Input
            onBlur={(e) => handleUpdateStep(e)}
            onKeyDown={(e) => e.key === "Enter" && handleUpdateStep(e)}
            defaultValue={step.value}
            fontSize={"small"}
            h="auto"
            p={0}
            rounded="5px"
            border="none"
            outline="none"
            _focus={{ border: "none", boxShadow: "none", textDecor: "none", textColor: "black" }}
            {...step.checked && {
                textDecor: "line-through",
                textColor: "gray.400"
            }
            }
        />
    )
}

export default UpdateStep
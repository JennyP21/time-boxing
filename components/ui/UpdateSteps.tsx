import { handleErrors } from '@/components/utils/handleErrors';
import { updateStepError } from '@/constants';
import { StepsI } from '@/interfaces';
import { useUpdateStepMutation } from '@/lib/features/stepsApi';
import { Flex, InputGroup } from '@chakra-ui/react';
import DeleteStep from './DeleteStep';
import UpdateStep from './UpdateStep';
import UpdateStepStatus from './UpdateStepStatus';

interface Props {
    steps: StepsI[];
    task_id: string;
    hideCheckedStep: boolean;
}

const UpdateSteps = ({ steps, task_id, hideCheckedStep }: Props) => {
    const [updateStep, { error }] = useUpdateStepMutation();
    if (error) handleErrors(error, updateStepError.type);

    return (
        <Flex flexDir="column" maxHeight={"40vh"}>
            {steps.map((step) => (
                <InputGroup className='px-2 gap-1 rounded-full flex items-center' py={0.5} hidden={hideCheckedStep && step.checked} key={step.id} _hover={{
                    background: "gray.100"
                }}>
                    <UpdateStepStatus task_id={task_id} step_id={step.id} checked={step.checked} updateStep={updateStep} />
                    <UpdateStep task_id={task_id} step_id={step.id} step={step} updateStep={updateStep} />
                    <DeleteStep step_id={step.id} />
                </InputGroup>
            ))}
        </Flex>
    )
}

export default UpdateSteps
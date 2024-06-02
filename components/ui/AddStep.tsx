import { addStepError } from '@/constants';
import { StepsI } from '@/interfaces';
import { useAddStepMutation } from '@/lib/features/stepsApi';
import { Checkbox, Input, InputGroup } from '@chakra-ui/react';
import { SyntheticEvent, useState } from 'react';
import { handleErrors } from '../utils/handleErrors';

interface Props {
    steps: StepsI[];
    task_id: string;
}

const AddStep = ({ steps, task_id }: Props) => {
    const [stepValue, setStepValue] = useState("");

    const [addStep, { error }] = useAddStepMutation();
    if (error) handleErrors(error, addStepError.type);

    const handleAddStep = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (stepValue) {
            const data = {
                task_id,
                value: stepValue,
                order: steps.length === 0 ? 1 : steps[steps.length - 1].order + 1,
            } as StepsI;
            await addStep(data);
        }
        setStepValue("");
    }

    return (
        <>
            {steps.length < 20 &&
                <InputGroup py={1} px={2} gap={1} rounded="full" _hover={{
                    background: "gray.100"
                }}>
                    <Checkbox size={"md"} colorScheme='blue' isDisabled />
                    <Input
                        fontSize={"small"}
                        autoFocus
                        placeholder='Add an item'
                        h="auto"
                        p={0}
                        rounded="5px"
                        border="none"
                        outline="none"
                        value={stepValue}
                        onChange={(e) => setStepValue(e.target.value)}
                        onKeyDown={async (e) => (e.key === "Enter") && await handleAddStep(e)}
                        onBlur={async (e) => await handleAddStep(e)}
                        _focus={{ border: "none", boxShadow: "none" }}
                    />
                </InputGroup>}
        </>
    )
}

export default AddStep
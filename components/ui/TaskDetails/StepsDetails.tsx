import { handleErrors } from '@/components/utils/handleErrors';
import { addStepError, deleteStepError, updateStepError } from '@/constants';
import { StepsI } from '@/interfaces';
import { useAddStepMutation, useDeleteStepMutation, useUpdateStepMutation } from '@/lib/features/stepsApi';
import { Checkbox, Flex, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { SyntheticEvent } from 'react';
import { MdOutlineDelete } from "react-icons/md";

interface Props {
    steps: StepsI[];
    task_id: string;
    showMinimumVersion: boolean;
}

const StepsDetails = ({ steps, task_id, showMinimumVersion }: Props) => {
    const [addStep, { error: stepAddError }] = useAddStepMutation();
    if (stepAddError) handleErrors(stepAddError, addStepError.type);
    const handleAddStep = async (e: SyntheticEvent) => {
        e.preventDefault();
        let value = (e.target as HTMLInputElement).value
        if (value) {
            const data = {
                task_id,
                value,
                order: steps.length === 0 ? 1 : steps[steps.length - 1].order + 1,
            } as StepsI;
            await addStep(data);
        }
    }

    const [deleteStep, { error: stepDeleteError }] = useDeleteStepMutation();
    if (stepDeleteError) handleErrors(stepDeleteError, deleteStepError.type);
    const handleDeleteStep = async (id: string) => {
        await deleteStep(id);
    }

    const [updateStep, { error: stepUpdateError }] = useUpdateStepMutation();
    if (stepUpdateError) handleErrors(stepUpdateError, updateStepError.type);
    const handleUpdateStep = async (id: string, e: SyntheticEvent) => {
        e.preventDefault();
        const value = (e.target as HTMLInputElement).value;
        if (value) {
            const data = {
                id,
                task_id,
                value,
            } as StepsI;
            await updateStep(data);
        }
    }

    const handleStepStatus = async (id: string, currentStatus: boolean) => {
        const data = {
            id,
            task_id,
            checked: !currentStatus
        } as StepsI;
        await updateStep(data);
    }

    return (
        <Flex flexDir="column" maxHeight={"40vh"} overflowY={showMinimumVersion ? "unset" : "scroll"}>
            {steps.map((step) => (
                <InputGroup className='px-2 gap-1 rounded-full flex items-center' py={showMinimumVersion ? 0.5 : 1} hidden={step.checked && showMinimumVersion} key={step.id} _hover={{
                    background: "gray.100"
                }}>
                    <Checkbox id={step.id} size={"md"} colorScheme='blue' defaultChecked={step.checked} onChange={() => handleStepStatus(step.id, step.checked)} />
                    <Input
                        onBlur={(e) => handleUpdateStep(step.id, e)}
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
                    <InputRightElement onClick={() => handleDeleteStep(step.id)} _groupHover={{ visibility: "visible" }} className='rounded-full hover:bg-gray-300 !h-7 !w-7' visibility="hidden" children={<MdOutlineDelete />} />
                </InputGroup>
            ))}
            {steps.length < 20 && !showMinimumVersion &&
                <InputGroup py={1} px={2} gap={1} rounded="full" _hover={{
                    background: "gray.100"
                }}>
                    <Checkbox size={"md"} colorScheme='blue' />
                    <Input
                        fontSize={"small"}
                        autoFocus
                        placeholder='Add an item'
                        h="auto"
                        p={0}
                        rounded="5px"
                        border="none"
                        outline="none"
                        onKeyDown={async (e) => {
                            if (e.key === "Enter") {
                                await handleAddStep(e);
                                (e.target as HTMLInputElement).value = "";
                            }
                        }}
                        onBlur={async (e) => {
                            await handleAddStep(e);
                            e.target.value = ""
                        }}
                        _focus={{ border: "none", boxShadow: "none" }}
                    />
                </InputGroup>}
        </Flex>
    )
}

export default StepsDetails
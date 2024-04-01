import { StepsI } from '@/interfaces';
import { useAddStepMutation, useDeleteStepMutation, useUpdateStepMutation } from '@/lib/features/stepsApi';
import { Checkbox, Flex, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { MdOutlineDelete } from "react-icons/md";

interface Props {
    steps: StepsI[];
    task_id: string;
}

const StepsDetails = ({ steps, task_id }: Props) => {
    const [addStep] = useAddStepMutation();
    const handleAddStep = async (value: string) => {
        if (value) {
            const data = {
                task_id,
                value,
                order: steps.length === 0 ? 1 : steps[steps.length - 1].order + 1,
            } as StepsI;
            await addStep(data);
        }
    }

    const [deleteStep] = useDeleteStepMutation();
    const handleDeleteStep = async (id: string) => {
        await deleteStep(id);
    }

    const [updateStep] = useUpdateStepMutation();
    const handleUpdateStep = async (id: string, value: string) => {
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

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        if (e.key === 'Enter') {
            await handleAddStep(target.value);
            target.value = '';
        }
    };

    return (
        <Flex flexDir="column" maxHeight={"40vh"} overflowY={"scroll"}>
            {steps.map((step) => (
                <InputGroup className='py-1 px-2 gap-1 my-0.5 rounded-full flex items-center' key={step.id} _hover={{
                    background: "gray.100"
                }}>
                    <Checkbox id={step.id} size={"md"} colorScheme='blue' defaultChecked={step.checked} onChange={() => handleStepStatus(step.id, step.checked)} />
                    <Input
                        onBlur={(e) => handleUpdateStep(step.id, e.target.value)}
                        defaultValue={step.value}
                        fontSize={"small"}
                        h="auto"
                        p={0}
                        rounded="5px"
                        border="none"
                        outline="none"
                        _focus={{ border: "none", boxShadow: "none" }}
                        {...step.checked &&
                        {
                            textDecoration: "line-through",
                            textColor: "gray.400"
                        }
                        }
                    />
                    <InputRightElement onClick={() => handleDeleteStep(step.id)} _groupHover={{ visibility: "visible" }} className='rounded-full hover:bg-gray-300 !h-7 !w-7' visibility="hidden" children={<MdOutlineDelete />} />
                </InputGroup>
            ))}
            {steps.length < 20 &&
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
                        onKeyDown={(e) => {
                            handleKeyDown(e)
                        }}
                        onBlur={async (e) => {
                            await handleAddStep(e.target.value);
                            e.target.value = "";
                        }}
                        _focus={{ border: "none", boxShadow: "none" }}
                    />
                </InputGroup>}
        </Flex>
    )
}

export default StepsDetails
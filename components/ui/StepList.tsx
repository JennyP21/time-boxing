import { TaskI } from '@/interfaces';
import { useUpdateTaskMutation } from '@/lib/features/taskApi';
import { Box, Checkbox, Flex, HStack, Input, InputGroup, Radio, Text } from '@chakra-ui/react';

interface Props {
    steps: string[]
    task_id: string;
    user_id: string;
}

const StepList = ({ steps, task_id, user_id }: Props) => {

    const [updateTask] = useUpdateTaskMutation();

    const handleShowOnCard = async () => {
        const data = { showOnTask: "steps", id: task_id, user_id } as TaskI;
        await updateTask(data);
    }

    return (
        <Box my={2}>
            <HStack justifyContent="space-between" fontSize="small">
                <Text>Checklist 0 / 20</Text>
                <Radio my={1} size={"md"} colorScheme='blue' value='steps' onChange={handleShowOnCard}><Text fontSize={"small"}>Show on card</Text></Radio>
            </HStack>
            <Flex flexDir="column" maxHeight={"40vh"} overflowY={"scroll"}>
                {steps && steps.map((step, index) => (
                    <InputGroup py={1} px={2} gap={1} rounded="full" key={index} _hover={{
                        background: "gray.100"
                    }}>
                        <Checkbox size={"md"} colorScheme='blue' />
                        <Input
                            defaultValue={step}
                            fontSize={"small"}
                            h="auto"
                            p={0}
                            rounded="5px"
                            border="none"
                            outline="none"
                            _focus={{ border: "none", boxShadow: "none" }}
                        />
                    </InputGroup>
                ))}
                <InputGroup py={1} px={2} gap={1} rounded="full" _hover={{
                    background: "gray.100"
                }}>
                    <Checkbox size={"md"} colorScheme='blue' />
                    <Input
                        fontSize={"small"}
                        placeholder='Add an item'
                        h="auto"
                        p={0}
                        rounded="5px"
                        border="none"
                        outline="none"
                        _focus={{ border: "none", boxShadow: "none" }}
                    />
                </InputGroup>
            </Flex>
        </Box>
    )
}

export default StepList
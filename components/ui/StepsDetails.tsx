import { StepsI } from '@/interfaces';
import { Checkbox, Flex, Input, InputGroup } from '@chakra-ui/react';

interface Props {
    steps: StepsI[];
    task_id: string;
}

const StepsDetails = ({ steps, task_id }: Props) => {
    return (
        <Flex flexDir="column" maxHeight={"40vh"} overflowY={"scroll"}>
            {steps && steps.map((step, index) => (
                <InputGroup py={1} px={2} gap={1} rounded="full" key={index} _hover={{
                    background: "gray.100"
                }}>
                    <Checkbox size={"md"} colorScheme='blue' />
                    <Input
                        defaultValue={step.value}
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
    )
}

export default StepsDetails
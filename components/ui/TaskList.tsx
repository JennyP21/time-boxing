import { Box, Checkbox, Flex, HStack, Text } from '@chakra-ui/react'
import React from 'react'

const TaskList = () => {
    return (
        <Box my={2}>
            <HStack justifyContent="space-between" fontSize="small">
                <Text>Checklist 0 / 20</Text>
                <Checkbox my={1} size={"md"} colorScheme='blue'><Text fontSize={"small"}>Show on card</Text></Checkbox>
            </HStack>
            <Flex flexDir="column" gap={1} maxHeight={"40vh"} overflowY={"scroll"}>
                <Checkbox size={"md"} colorScheme='blue'>
                    <Text fontSize={"small"}>Task 1</Text>
                </Checkbox>
                <Checkbox size={"md"} colorScheme='blue'>
                    <Text fontSize={"small"}>Task 2</Text>
                </Checkbox>
                <Checkbox size={"md"} colorScheme='blue'>
                    <Text fontSize={"small"}>Task 3</Text>
                </Checkbox>
                <Checkbox size={"md"} colorScheme='blue'>
                    <Text fontSize={"small"}>Task 1</Text>
                </Checkbox>
                <Checkbox size={"md"} colorScheme='blue'>
                    <Text fontSize={"small"}>Task 2</Text>
                </Checkbox>
                <Checkbox size={"md"} colorScheme='blue'>
                    <Text fontSize={"small"}>Task 3</Text>
                </Checkbox>
                <Checkbox size={"md"} colorScheme='blue'>
                    <Text fontSize={"small"}>Task 1</Text>
                </Checkbox>
                <Checkbox size={"md"} colorScheme='blue'>
                    <Text fontSize={"small"}>Task 2</Text>
                </Checkbox>
                <Checkbox size={"md"} colorScheme='blue'>
                    <Text fontSize={"small"}>Task 3</Text>
                </Checkbox>
                <Checkbox size={"md"} colorScheme='blue'>
                    <Text fontSize={"small"}>Task 1</Text>
                </Checkbox>
                <Checkbox size={"md"} colorScheme='blue'>
                    <Text fontSize={"small"}>Task 2</Text>
                </Checkbox>
                <Checkbox size={"md"} colorScheme='blue'>
                    <Text fontSize={"small"}>Task 3</Text>
                </Checkbox>
                <Checkbox size={"md"} colorScheme='blue'>
                    <Text fontSize={"small"}>Task 1</Text>
                </Checkbox>
                <Checkbox size={"md"} colorScheme='blue'>
                    <Text fontSize={"small"}>Task 2</Text>
                </Checkbox>
                <Checkbox size={"md"} colorScheme='blue'>
                    <Text fontSize={"small"}>Task 3</Text>
                </Checkbox>
                <Checkbox size={"md"} colorScheme='blue'>
                    <Text fontSize={"small"}>Task 1</Text>
                </Checkbox>
                <Checkbox size={"md"} colorScheme='blue'>
                    <Text fontSize={"small"}>Task 2</Text>
                </Checkbox>
                <Checkbox size={"md"} colorScheme='blue'>
                    <Text fontSize={"small"}>Task 3</Text>
                </Checkbox>
                <Checkbox size={"md"} colorScheme='blue'>
                    <Text fontSize={"small"}>Task 2</Text>
                </Checkbox>
                <Checkbox size={"md"} colorScheme='blue'>
                    <Text fontSize={"small"}>Task 3</Text>
                </Checkbox>
            </Flex>
        </Box>
    )
}

export default TaskList
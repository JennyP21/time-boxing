"use client"
import { Box, Flex, Icon, Text, useDisclosure } from "@chakra-ui/react";
import { BsCalendarDate } from "react-icons/bs";
import SetDueDate from "./SetDueDate";

interface Props {
    task_id: string;
    user_id: string;
    currDueDate: string;
}

const DueDate = ({ task_id, user_id, currDueDate }: Props) => {
    const { onClose, onOpen, isOpen } = useDisclosure();
    return (
        <Box>
            <Flex className="py-1 gap-2 rounded-md justify-center items-center cursor-pointer" onClick={onOpen} _hover={{ bg: "gray.100" }}>
                <Text>{currDueDate || "Due by"}</Text>
                <Icon as={BsCalendarDate} />
            </Flex>
            <SetDueDate onClose={onClose} isOpen={isOpen} task_id={task_id} user_id={user_id} currDueDate={currDueDate} />
        </Box>
    )
}

export default DueDate
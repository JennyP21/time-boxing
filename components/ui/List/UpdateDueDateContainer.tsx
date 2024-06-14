import { Box, Flex, Icon, Text, useDisclosure } from "@chakra-ui/react";
import { BsCalendarDate } from "react-icons/bs";
import UpdateDueDateModal from "./UpdateDueDateModal";

interface Props {
    task_id: string;
    currDueDate: string;
    currStartDate: string;
}

const UpdateDueDateContainer = ({ task_id, currDueDate, currStartDate }: Props) => {
    const { onClose, onOpen, isOpen } = useDisclosure();
    return (
        <Box>
            <Flex className="w-fit p-1 gap-2 rounded-md items-center cursor-pointer" onClick={onOpen} _hover={{ bg: "gray.100" }}>
                <Text>{currDueDate || "Due by"}</Text>
                <Icon as={BsCalendarDate} />
            </Flex>
            <UpdateDueDateModal onClose={onClose} isOpen={isOpen} task_id={task_id} currEndDate={currDueDate} currStartDate={currStartDate} />
        </Box>
    )
}

export default UpdateDueDateContainer
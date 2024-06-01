import { handleErrors } from "@/components/utils/handleErrors";
import { unassignLabelError } from "@/constants";
import { LabelI, Task_LabelI } from "@/interfaces";
import { useUnassignLabelMutation } from '@/lib/features/labelApi';
import { Flex, Icon } from '@chakra-ui/react';
import { IoClose } from "react-icons/io5";

interface Props {
    task_id: string;
    assignedLabels: LabelI[] | undefined;
}

const UnassignLabel = ({ task_id, assignedLabels }: Props) => {
    const [unassignLabel, { error }] = useUnassignLabelMutation();
    if (error) handleErrors(error, unassignLabelError.type);

    const handleLabelUnAssignment = async (label_id: string) => {
        const data = {
            task_id,
            label_id,
        } as Task_LabelI;
        await unassignLabel(data)
    }

    return (
        <Flex gap={2}>
            {assignedLabels?.map((label) => (
                <Flex key={label.id} alignContent="center">
                    <Flex as={"span"} className='items-center rounded-md text-xs p-1 gap-1' bg={"gray.300"}>{label.name}
                        <Icon as={IoClose} className="rounded-full text-md" w={4} h={4} _hover={{
                            bg: "gray.400"
                        }} onClick={() => handleLabelUnAssignment(label.id)} />
                    </Flex>
                </Flex>
            ))}
        </Flex>
    )
}

export default UnassignLabel
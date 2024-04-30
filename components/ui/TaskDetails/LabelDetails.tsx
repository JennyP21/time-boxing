"use client"
import Skeleton from "@/components/loading/Skeleton";
import { handleErrors } from "@/components/utils/handleErrors";
import { assignLabelError, getLabelsError, unassignLabelError } from "@/constants";
import { Task_LabelI } from "@/interfaces";
import { useAssignLabelMutation, useGetLabelsByProjectIdQuery, useGetLabelsByTaskQuery, useUnassignLabelMutation } from '@/lib/features/labelApi';
import { Flex, Icon, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { IoClose } from "react-icons/io5";
import { MdOutlineNewLabel } from "react-icons/md";

interface Props {
    task_id: string;
    project_id: string;
}

const LabelDetails = ({ task_id, project_id }: Props) => {
    const { data: labels, error: getTaskLabelsError } = useGetLabelsByTaskQuery(task_id);
    if (getTaskLabelsError) handleErrors(getTaskLabelsError, getLabelsError.type);

    const { data: allLabels, error: getAllLabelsError, isLoading } = useGetLabelsByProjectIdQuery(project_id);
    if (getAllLabelsError) handleErrors(getAllLabelsError, getLabelsError.type);

    const filteredLabels = allLabels?.filter(label => !labels?.find(item => item.id === label.id));

    const [assignLabel, { error: labelAssignError }] = useAssignLabelMutation();
    if (labelAssignError) handleErrors(labelAssignError, assignLabelError.type);
    const handleLabelAssignment = async (label_id: string) => {
        const data = {
            task_id,
            label_id,
        } as Task_LabelI;
        await assignLabel(data);
    }

    const [unassignLabel, { error: labelUnassignError }] = useUnassignLabelMutation();
    if (labelUnassignError) handleErrors(labelUnassignError, unassignLabelError.type);
    const handleLabelUnAssignment = async (label_id: string) => {
        const data = {
            task_id,
            label_id,
        } as Task_LabelI;
        await unassignLabel(data)
    }

    return (
        <Flex className='my-2'>
            {filteredLabels && filteredLabels?.length > 0 && <Menu>
                <MenuButton>
                    <Icon as={MdOutlineNewLabel} w={6} h={6} mr={2} />
                </MenuButton>
                <MenuList>
                    {filteredLabels.map(label => (
                        <MenuItem key={label.id} onClick={() => handleLabelAssignment(label.id)} type="button">
                            <Text>{label.name}</Text>
                        </MenuItem>
                    ))}
                    {isLoading && <Skeleton count={3} width="100%" height="25px" />}
                </MenuList>
            </Menu>}
            <Flex gap={2}>
                {labels && labels[0].id !== null && labels.map((label) => (
                    <Flex key={label.id} alignContent="center">
                        <Flex as={"span"} className='items-center rounded-md text-xs p-1 gap-1' bg={"gray.300"}>{label.name}
                            <Icon as={IoClose} className="rounded-full text-md" w={4} h={4} _hover={{
                                bg: "gray.400"
                            }} onClick={() => handleLabelUnAssignment(label.id)} />
                        </Flex>
                    </Flex>
                ))}
            </Flex>
        </Flex>
    )
}

export default LabelDetails
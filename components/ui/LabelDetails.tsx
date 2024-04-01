"use client"
import Skeleton from "@/components/ui/Skeleton";
import { LabelI, Task_LabelI } from "@/interfaces";
import { useAssignLabelMutation, useGetLabelsByTaskQuery, useGetLabelsQuery, useUnassignLabelMutation, useUpdateLabelMutation } from '@/lib/features/labelApi';
import { Box, Flex, Icon, Input, InputGroup, InputRightElement, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { SyntheticEvent, useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdOutlineNewLabel } from "react-icons/md";


interface Props {
    task_id: string;
}

const LabelDetails = ({ task_id }: Props) => {
    const { data: labels } = useGetLabelsByTaskQuery(task_id);
    const { data: allLabels, isLoading } = useGetLabelsQuery();

    const initialState = {
        labelId: "",
        editing: false,
    };
    const [editLabel, setEditLabel] = useState(initialState);

    const [updateLabel] = useUpdateLabelMutation();

    const handleLabelUpdate = async (e: SyntheticEvent) => {
        const newValue = (e.target as HTMLInputElement).value;
        const currentLabel = labels?.find(label => label.id === editLabel.labelId);
        if (currentLabel?.name !== newValue) {
            const newLabel = {
                ...currentLabel,
                name: newValue
            } as LabelI;
            await updateLabel(newLabel);
        }
        setEditLabel(initialState);
    }

    const [assignLabel] = useAssignLabelMutation();
    const handleLabelAssignment = async () => {
        const data = {
            task_id,
            label_id: editLabel.labelId
        } as Task_LabelI;
        await assignLabel(data);
    }

    const [unassignLabel] = useUnassignLabelMutation();
    const handleLabelUnAssignment = async () => {
        const data = {
            task_id,
            label_id: editLabel.labelId
        } as Task_LabelI;
        await unassignLabel(data)

        setEditLabel(initialState);
    }

    return (
        <Flex className='my-2'>
            <Menu>
                <MenuButton>
                    <Icon as={MdOutlineNewLabel} w={6} h={6} mr={2} />
                </MenuButton>
                <MenuList>
                    {allLabels?.map(label => (
                        <MenuItem key={label.id}>{label.name}</MenuItem>
                    ))}
                    {isLoading && <Skeleton count={3} width="100%" height="25px" />}
                </MenuList>
            </Menu>
            <Flex gap={2}>
                {labels?.map((label) => (
                    <>
                        {editLabel.editing && label.id === editLabel.labelId ?
                            <InputGroup key={label.id}>
                                <Input autoFocus className='!w-fit !h-fit rounded-md !text-xs !p-1' bg={"gray.300"} defaultValue={label.name} onBlur={(e) => handleLabelUpdate(e)} />
                                <InputRightElement className="rounded-full !w-fit !h-fit !top-[50%] -translate-y-[50%] !right-1" _hover={{
                                    bg: "gray.400"
                                }} children={<IoClose />} onClick={() => setEditLabel(initialState)} />
                            </InputGroup>
                            :
                            <Box as={"span"} className='rounded-md text-xs p-1' bg={"gray.300"} key={label.id} onClick={() => setEditLabel({
                                labelId: label.id,
                                editing: true
                            })}>{label.name}</Box>
                        }
                    </>
                ))}
            </Flex>
        </Flex>
    )
}

export default LabelDetails
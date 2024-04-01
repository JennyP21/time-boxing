"use client"
import Skeleton from "@/components/ui/Skeleton";
import { LabelI, Task_LabelI } from "@/interfaces";
import { useAssignLabelMutation, useGetLabelsByTaskQuery, useGetLabelsQuery, useUnassignLabelMutation, useUpdateLabelMutation } from '@/lib/features/labelApi';
import { Flex, Icon, Input, InputGroup, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { SyntheticEvent, useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdOutlineNewLabel } from "react-icons/md";

interface Props {
    task_id: string;
}

const LabelDetails = ({ task_id }: Props) => {
    const { data: labels } = useGetLabelsByTaskQuery(task_id);
    const { data: allLabels, isLoading } = useGetLabelsQuery();
    const filteredLabels = allLabels?.filter(label => !labels?.find(item => item.id === label.id));

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
                id: currentLabel?.id,
                name: newValue
            } as LabelI;
            console.log(newLabel);
            await updateLabel(newLabel);
        }
        setEditLabel(initialState);
    }

    const [assignLabel] = useAssignLabelMutation();
    const handleLabelAssignment = async (label_id: string) => {
        const data = {
            task_id,
            label_id,
        } as Task_LabelI;
        await assignLabel(data);
    }

    const [unassignLabel] = useUnassignLabelMutation();
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
                        <MenuItem key={label.id} onClick={() => handleLabelAssignment(label.id)}>{label.name}</MenuItem>
                    ))}
                    {isLoading && <Skeleton count={3} width="100%" height="25px" />}
                </MenuList>
            </Menu>}
            <Flex gap={2}>
                {labels?.map((label) => (
                    <Flex key={label.id} alignContent="center">
                        {editLabel.editing && label.id === editLabel.labelId ?
                            <InputGroup>
                                <Input autoFocus className='!w-fit !h-fit rounded-md !text-xs !p-1' bg={"gray.300"} defaultValue={label.name} onBlur={(e) => handleLabelUpdate(e)} />
                            </InputGroup>
                            :
                            <Flex as={"span"} className='items-center rounded-md text-xs p-1 gap-1' bg={"gray.300"} onClick={() => setEditLabel({
                                labelId: label.id,
                                editing: true
                            })}>{label.name}
                                <Icon as={IoClose} className="rounded-full text-md" w={4} h={4} _hover={{
                                    bg: "gray.400"
                                }} onClick={() => handleLabelUnAssignment(label.id)} />
                            </Flex>
                        }
                    </Flex>
                ))}
            </Flex>
        </Flex>
    )
}

export default LabelDetails
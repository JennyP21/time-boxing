"use client"
import Skeleton from "@/components/loading/Skeleton";
import { handleErrors } from "@/components/utils/handleErrors";
import { addLabelError, assignLabelError, deleteLabelError, getLabelsError, unassignLabelError, updateLabelError } from "@/constants";
import { LabelI, Task_LabelI } from "@/interfaces";
import { useAddLabelMutation, useAssignLabelMutation, useDeleteLabelMutation, useGetLabelsByProjectIdQuery, useGetLabelsByTaskQuery, useUnassignLabelMutation, useUpdateLabelMutation } from '@/lib/features/labelApi';
import { Flex, Icon, Input, InputGroup, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { SyntheticEvent, useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdOutlineDelete, MdOutlineNewLabel } from "react-icons/md";

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

    const initialState = {
        labelId: "",
        editing: false,
    };
    const [editLabel, setEditLabel] = useState(initialState);

    const [updateLabel, { error: LabelUpdateError }] = useUpdateLabelMutation();
    if (LabelUpdateError) handleErrors(LabelUpdateError, updateLabelError.type);
    const handleLabelUpdate = async (e: SyntheticEvent) => {
        const newValue = (e.target as HTMLInputElement).value;
        const currentLabel = labels?.find(label => label.id === editLabel.labelId);
        if (currentLabel?.name !== newValue) {
            const newLabel = {
                id: currentLabel?.id,
                name: newValue,
                project_id
            } as LabelI;
            await updateLabel(newLabel);
        }
        setEditLabel(initialState);
    }

    const [addLabel, { error: LabelAddError }] = useAddLabelMutation();
    if (LabelAddError) handleErrors(LabelAddError, addLabelError.type);
    const handleLabelAdd = async (e: SyntheticEvent) => {
        const input = e.target as HTMLInputElement;
        await addLabel({ name: input.value, project_id } as LabelI);
        input.value = "";
    }

    const [deleteLabel, { error: labelDeleteError }] = useDeleteLabelMutation();
    if (labelDeleteError) handleErrors(labelDeleteError, deleteLabelError.type);
    const handleLabelDelete = async (id: string) => {
        await deleteLabel(id);
    }

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
                        <MenuItem key={label.id} onClick={() => handleLabelAssignment(label.id)}>
                            <Flex className="justify-between items-center w-full" role="group">
                                <Text>{label.name}</Text>
                                <Icon
                                    className="p-1 rounded-full"
                                    w={6}
                                    h={6}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleLabelDelete(label.id)
                                    }}
                                    as={MdOutlineDelete}
                                    _groupHover={{ visibility: "visible" }}
                                    visibility='hidden'
                                    _hover={{
                                        bg: "gray.300"
                                    }}
                                />
                            </Flex>
                        </MenuItem>
                    ))}
                    {isLoading && <Skeleton count={3} width="100%" height="25px" />}
                </MenuList>
            </Menu>}
            <Flex gap={2}>
                {labels && labels[0].id !== null && labels.map((label) => (
                    <Flex key={label.id} alignContent="center">
                        {editLabel.editing && label.id === editLabel.labelId ?
                            <InputGroup>
                                <Input autoFocus size="sm" w="fit-content" h="fit-content" p={1} className='rounded-md' bg={"gray.300"} defaultValue={label.name} onBlur={(e) => handleLabelUpdate(e)} />
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
                <Input autoFocus
                    onBlur={(e) => handleLabelAdd(e)}
                    onKeyDown={(e) => e.key === "Enter" && handleLabelAdd(e)}
                    className='rounded-lg'
                    outline="none"
                    border="none"
                    _focus={{ boxShadow: "none" }}
                    size="sm"
                    minW="fit-content"
                    h="fit-content"
                    p={1}
                    placeholder="Add a new label"
                />
            </Flex>
        </Flex>
    )
}

export default LabelDetails
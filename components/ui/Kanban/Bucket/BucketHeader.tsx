"use client"
import { handleErrors } from '@/components/utils/handleErrors';
import { deleteBucketError, updateBucketError } from '@/constants';
import { BucketI, ProjectI } from '@/interfaces';
import { useDeleteBucketMutation, useUpdateBucketMutation } from '@/lib/features/bucketApi';
import { Flex, Icon, Input, Menu, MenuButton, MenuItem, MenuList, Spinner, Text } from '@chakra-ui/react';
import { SyntheticEvent, useState } from 'react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';

interface Props {
    id: string;
    name: string;
    project: ProjectI;
}

const BucketHeader = ({ id, name, project }: Props) => {
    const [active, setActive] = useState(false);

    const [deleteBucket, { error: deleteError }] = useDeleteBucketMutation();
    const [updateBucket, { error: updateError, isLoading: updateBucketLoading }] = useUpdateBucketMutation();

    const handleBucketDelete = async () => await deleteBucket(id);

    if (updateError) handleErrors(updateError, updateBucketError.type);

    if (deleteError) handleErrors(deleteError, deleteBucketError.type);

    const handleBucketUpdate = async (e: SyntheticEvent) => {
        const updatedName = (e.target as HTMLInputElement).value;
        if (name !== updatedName && updatedName !== "") {
            const data = {
                id,
                name: updatedName,
                project_id: project.id
            } as BucketI;
            if (name !== updatedName) {
                await updateBucket(data);
            }
        }
        setActive(false);
    }

    return (
        <Flex className='w-full justify-between' p={1}>
            {updateBucketLoading ? <Spinner size="sm" /> : <>
                {active ?
                    <Input
                        autoFocus
                        size={"xs"}
                        onBlur={(e) => handleBucketUpdate(e)}
                        defaultValue={name}
                        onKeyDown={(e) => e.key === "Enter" && handleBucketUpdate(e)}
                    /> :
                    <Text size="md" align='left' width="100%">{name}</Text>
                }
            </>}
            <Menu placement='bottom-end'>
                <MenuButton>
                    <Icon as={HiOutlineDotsHorizontal} w={4} h={4} />
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={handleBucketDelete}>Delete</MenuItem>
                    <MenuItem onClick={() => setActive(true)}>Rename</MenuItem>
                </MenuList>
            </Menu>
        </Flex>
    )
}

export default BucketHeader
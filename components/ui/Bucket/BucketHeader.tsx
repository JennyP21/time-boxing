"use client"
import { toast } from '@/components/error/Toast';
import { deleteBucketError, updateBucketError } from '@/constants';
import { BucketI } from '@/interfaces';
import { useDeleteBucketMutation, useUpdateBucketMutation } from '@/lib/features/bucketApi';
import { Flex, Icon, Input, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';

interface Props {
    id: string;
    name: string;
}

const BucketHeader = ({ id, name }: Props) => {
    const [active, setActive] = useState(false);
    const [updatedName, setUpdatedName] = useState(name);

    const session = useSession();
    const [deleteBucket, { error: deleteError }] = useDeleteBucketMutation();
    const [updateBucket, { error: updateError }] = useUpdateBucketMutation();

    const handleDelete = async () => {
        await deleteBucket(id);
    }

    const handleUpdate = async () => {
        const data = {
            name: updatedName,
            id,
            user_id: session.data?.user?.id,
        } as BucketI;
        if (name !== updatedName) {
            await updateBucket(data);
        }
        setActive(false);
    }

    if (updateError) toast.error(updateBucketError.message, {
        toastId: updateBucketError.type
    });

    if (deleteError) toast.error(deleteBucketError.message, {
        toastId: deleteBucketError.type
    });

    return (
        <Flex className='w-full justify-between'>
            {active ? <Input autoFocus size={"sm"} value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} onBlur={handleUpdate} /> :
                <Text size="md" align='left' width="100%">{name}</Text>
            }
            <Menu placement='bottom-end'>
                <MenuButton>
                    <Icon as={HiOutlineDotsHorizontal} w={4} h={4} />
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                    <MenuItem onClick={() => setActive(true)}>Rename</MenuItem>
                </MenuList>
            </Menu>
        </Flex>
    )
}

export default BucketHeader
"use client"
import { useDeleteBucketMutation } from '@/lib/features/bucketApi';
import { Flex, Menu, MenuButton, Icon, MenuList, MenuItem, Text } from '@chakra-ui/react'
import React from 'react'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'

interface Props {
    id: string;
    name: string;
}

const BucketHeader = ({ id, name }: Props) => {

    const [deleteBucket] = useDeleteBucketMutation();

    const handleDelete = async () => {
        await deleteBucket(id);
    }

    return (
        <Flex className='w-full justify-between'>
            <Text size="md" align='left' width="100%">{name}</Text>
            <Menu placement='bottom-end'>
                <MenuButton>
                    <Icon as={HiOutlineDotsHorizontal} w={4} h={4} />
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={handleDelete}>Delete</MenuItem>
                    <MenuItem>Rename</MenuItem>
                </MenuList>
            </Menu>
        </Flex>
    )
}

export default BucketHeader
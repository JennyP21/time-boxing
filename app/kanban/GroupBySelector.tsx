"use client"
import { groupTypes } from '@/constants';
import { Button, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaAngleDown } from 'react-icons/fa';

const GroupBySelector = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const changeGroupType = (groupBy: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("groupBy", groupBy);
        router.push("?" + params.toString());
    }

    return (
        <Menu>
            <MenuButton fontWeight="normal" fontSize="medium" as={Button} p={2} m={0} border="1px" borderColor="gray.300" rounded="10px" rightIcon={<FaAngleDown />}>
                Group By {searchParams.get("groupBy")}
            </MenuButton>
            <MenuList>
                {groupTypes.map(type => (
                    <MenuItem key={type.name} onClick={() => changeGroupType(type.name)}>{type.name}</MenuItem>
                ))}
            </MenuList>
        </Menu>
    )
}

export default GroupBySelector
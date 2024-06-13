"use client"
import { groupTypes } from '@/constants';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { FaAngleDown } from 'react-icons/fa';

const GroupBySelector = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const changeGroupType = (groupBy: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("groupBy", groupBy);
        router.push("?" + params.toString());
    }

    useEffect(() => {
        if (!searchParams.get("groupBy")) {
            const params = new URLSearchParams(searchParams);
            params.set("groupBy", "Bucket");
            router.push("?" + params);
        }
    }, [])

    return (
        <Menu>
            <MenuButton size="sm" fontWeight="normal" as={Button} p={2} m={0} rounded="10px" rightIcon={<FaAngleDown />}>
                Group By {searchParams.get("groupBy")}
            </MenuButton>
            <MenuList>
                {groupTypes.map(type => (
                    <MenuItem key={type} onClick={() => changeGroupType(type)}>{type}</MenuItem>
                ))}
            </MenuList>
        </Menu>
    )
}

export default GroupBySelector
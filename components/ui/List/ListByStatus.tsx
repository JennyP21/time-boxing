import { listByTypes } from '@/constants';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { FaAngleDown } from 'react-icons/fa';

const ListByStatus = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const changeGroupType = (listBy: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("listBy", listBy);
        router.push("?" + params.toString());
    }

    useEffect(() => {
        if (!searchParams.get("listBy")) {
            const params = new URLSearchParams(searchParams);
            params.set("listBy", "Active");
            router.push("?" + params.toString());
        }
    }, [])

    return (
        <Menu>
            <MenuButton size="sm" fontWeight="normal" fontSize="medium" as={Button} p={2} m={0} rounded="10px" rightIcon={<FaAngleDown />}>
                {searchParams.get("listBy")}
            </MenuButton>
            <MenuList>
                {listByTypes.map(type => (
                    <MenuItem key={type} onClick={() => changeGroupType(type)}>{type}</MenuItem>
                ))}
            </MenuList>
        </Menu>
    )
}

export default ListByStatus
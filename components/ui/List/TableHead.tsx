import { tableHeaderRow } from '@/constants'
import { Flex, Icon, Th, Thead, Tr } from '@chakra-ui/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'

const TableHead = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const sortBy = searchParams.get("sortBy");
    const dir = searchParams.get("dir");

    const changeSort = (sortBy: string, dir: "asc" | "desc") => {
        const params = new URLSearchParams(searchParams);
        params.set("sortBy", sortBy);
        params.set("dir", dir);
        router.push("?" + params.toString());
    }

    return (
        <Thead>
            <Tr>
                {tableHeaderRow.map((col, index) => (
                    <Th
                        cursor={col.sortKey ? "pointer" : ""}
                        _hover={{ bg: col.sortKey ? "gray.100" : "" }}
                        key={index}
                        onClick={col.sortKey ? (() =>
                            changeSort(col.sortKey,
                                sortBy === col.sortKey ?
                                    dir === "asc" ? "desc" : "asc"
                                    : "asc"))
                            : undefined
                        }
                    >
                        <Flex className='items-center'>
                            {col.label} {col.sortKey && col.sortKey === sortBy && <Icon as={dir === "asc" ? BsArrowUp : BsArrowDown} />}
                        </Flex>
                    </Th>
                ))}
            </Tr>
        </Thead>
    )
}

export default TableHead
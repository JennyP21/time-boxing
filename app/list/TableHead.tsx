import { tableHeaderRow } from '@/constants'
import { Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'

const TableHead = () => {
    return (
        <Thead>
            <Tr>
                {tableHeaderRow.map((col, index) => (
                    <Th px={1} key={index} width={col.width}>{col.label}</Th>
                ))}
            </Tr>
        </Thead>
    )
}

export default TableHead
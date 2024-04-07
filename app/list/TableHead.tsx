import { tableHeaderRow } from '@/constants'
import { Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'

const TableHead = () => {
    return (
        <Thead>
            <Tr>
                <Th p={0}></Th>
                {tableHeaderRow.map(col => (
                    <Th px={1} key={col.label} width={col.width}>{col.label}</Th>
                ))}
            </Tr>
        </Thead>
    )
}

export default TableHead
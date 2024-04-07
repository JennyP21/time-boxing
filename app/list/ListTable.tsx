"use client"
import { useGetTasksQuery } from '@/lib/features/taskApi'
import { Table, TableContainer } from '@chakra-ui/react'
import TableBody from './TableBody'
import TableHead from './TableHead'

const ListTable = () => {
    const { data } = useGetTasksQuery();

    return (
        <TableContainer className='h-full flex-[1_0_0]'>
            <Table variant='simple'>
                <TableHead />
                <TableBody data={data} />
            </Table>
        </TableContainer>
    )
}

export default ListTable
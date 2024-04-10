"use client"
import { listByTypes } from '@/constants'
import { useGetTasksQuery } from '@/lib/features/taskApi'
import { Table, TableContainer } from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation'
import TableBody from './TableBody'
import TableHead from './TableHead'

const ListTable = () => {
    const { data } = useGetTasksQuery();

    const listBy = useSearchParams().get("listBy");

    if (listBy && !(listByTypes.includes(listBy))) {
        return null;
    }

    const inCompleteTasks = data?.filter(item => item.task.progress !== "Completed");
    const completedTasks = data?.filter(item => item.task.progress === "Completed");

    return (
        <TableContainer className='h-full flex-[1_0_0]'>
            <Table variant='simple'>
                <TableHead />
                <TableBody data={listBy === "Completed" ? completedTasks : inCompleteTasks} />
            </Table>
        </TableContainer>
    )
}

export default ListTable
"use client"
import { listByTypes } from '@/constants'
import { useGetTasksQuery } from '@/lib/features/taskApi'
import { Table, TableContainer } from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation'
import TableBody from './TableBody'
import TableHead from './TableHead'
import { ProjectI } from '@/interfaces'

interface Props {
    project: ProjectI;
}

const ListTable = ({ project }: Props) => {
    const { data } = useGetTasksQuery();

    const listBy = useSearchParams().get("listBy");

    if (listBy && !(listByTypes.includes(listBy))) {
        return null;
    }

    const incompleteTasks = data?.filter(item => item.task.progress !== "Completed");
    const completedTasks = data?.filter(item => item.task.progress === "Completed");

    return (
        <TableContainer className='h-full flex-[1_0_0]'>
            <Table variant='simple'>
                <TableHead />
                <TableBody data={listBy === "Completed" ? completedTasks : incompleteTasks} />
            </Table>
        </TableContainer>
    )
}

export default ListTable
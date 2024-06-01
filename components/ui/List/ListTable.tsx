"use client"
import TableLoading from '@/components/loading/TableLoading'
import { handleErrors } from '@/components/utils/handleErrors'
import { getTasksError, listByTypes } from '@/constants'
import { ProjectI } from '@/interfaces'
import { useGetTasksByProjectIdQuery } from '@/lib/features/taskApi'
import { Box, Table } from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation'
import TableBody from './TableBody'
import TableHead from './TableHead'

const ListTable = ({ project }: { project: ProjectI }) => {

    const { data, error, isLoading } = useGetTasksByProjectIdQuery(project.id);
    if (error) handleErrors(error, getTasksError.type);

    const listBy = useSearchParams().get("listBy");

    if (listBy && !(listByTypes.includes(listBy))) {
        return null;
    }

    const incompleteTasks = data?.filter(item => item.progress !== "Completed");
    const completedTasks = data?.filter(item => item.progress === "Completed");

    return (
        <Box className='overflow-x-hidden overflow-y-scroll flex-[1_0_0]'>
            {isLoading ?
                <TableLoading />
                :
                <Table variant='simple' size="sm">
                    <TableHead />
                    <TableBody project={project} data={listBy === "Completed" ? completedTasks : incompleteTasks} />
                </Table>
            }
        </Box>
    )
}

export default ListTable
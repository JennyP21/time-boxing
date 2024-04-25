"use client"
import TableLoading from '@/components/loading/TableLoading'
import { handleErrors } from '@/components/utils/handleErrors'
import { getTasksError, listByTypes } from '@/constants'
import { ProjectI } from '@/interfaces'
import { useGetTasksByProjectIdQuery } from '@/lib/features/taskApi'
import { Table, TableContainer } from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation'
import TableBody from './TableBody'
import TableHead from './TableHead'

interface Props {
    project: ProjectI;
}

const ListTable = ({ project }: Props) => {
    const { data, error, isLoading } = useGetTasksByProjectIdQuery(project.id);

    const listBy = useSearchParams().get("listBy");

    if (listBy && !(listByTypes.includes(listBy))) {
        return null;
    }

    if (error) handleErrors(error, getTasksError.type);

    const incompleteTasks = data?.filter(item => item.progress !== "Completed");
    const completedTasks = data?.filter(item => item.progress === "Completed");

    return (
        <TableContainer className='h-full flex-[1_0_0]'>
            {isLoading ? <TableLoading />
                :
                <Table variant='simple'>
                    <TableHead />
                    <TableBody project={project} data={listBy === "Completed" ? completedTasks : incompleteTasks} />
                </Table>
            }
        </TableContainer>
    )
}

export default ListTable
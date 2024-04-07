import { Table, TableContainer } from '@chakra-ui/react'
import TableBody from './TableBody'
import TableFoot from './TableFoot'
import TableHead from './TableHead'

const ListTable = () => {
    return (
        <TableContainer>
            <Table variant='simple'>
                <TableHead />
                <TableBody />
                <TableFoot />
            </Table>
        </TableContainer>
    )
}

export default ListTable
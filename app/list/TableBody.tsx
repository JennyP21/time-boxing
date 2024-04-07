import { TaskWithUserI } from '@/interfaces'
import { Checkbox, Input, Tbody, Td, Tr } from '@chakra-ui/react'

interface Props {
    data: TaskWithUserI[] | undefined;
}

const TableBody = ({ data }: Props) => {
    return (
        <Tbody>
            {data?.map(item => (
                <Tr key={item.tasks.id}>
                    <Td>
                        <Checkbox />
                    </Td>
                    <Td px={0}>{item.tasks.title}</Td>
                    <Td px={0}>{item.user.name}</Td>
                    <Td px={0}>{item.tasks.progress}</Td>
                    <Td px={0}>{item.tasks.severity}</Td>
                    <Td px={0}>{item.tasks.end_date}</Td>
                    <Td px={0}>{item.tasks.bucket_id}</Td>
                </Tr>
            ))}
        </Tbody>
    )
}

export default TableBody
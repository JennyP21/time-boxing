import { Text, VStack } from '@chakra-ui/react'
import KanbanTask from './KanbanTask'

interface Props {
    id: string;
    name: string;
}

const Bucket = ({ name }: Props) => {
    return (
        <VStack minWidth="280px" maxWidth="300px" ml={2} p={2}>
            <Text size="md" align='left' width="100%">{name}</Text>
            <KanbanTask />
            <KanbanTask />
        </VStack>
    )
}

export default Bucket
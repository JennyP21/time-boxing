import { Text, VStack } from '@chakra-ui/react'
import KanbanTask from './KanbanTask'

const Bucket = () => {
    return (
        <VStack minWidth="280px" maxWidth="300px" ml={2} p={2}>
            <Text size="md" align='left' width="100%">Bucket</Text>
            <KanbanTask />
        </VStack>
    )
}

export default Bucket
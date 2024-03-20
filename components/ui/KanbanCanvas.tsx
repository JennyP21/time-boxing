import { Text, VStack } from '@chakra-ui/react'
import KanbanTask from './KanbanTask'

const KanbanCanvas = () => {
    return (
        <VStack minWidth="280px" minHeight="100%" ml={2} p={2}>
            <Text size="md" align='left' width="100%">Bucket</Text>
            <KanbanTask />
        </VStack>
    )
}

export default KanbanCanvas
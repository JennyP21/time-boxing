import { VStack } from '@chakra-ui/react'
import React from 'react'
import KanbanTask from './KanbanTask'

const KanbanCanvas = () => {
    return (
        <VStack width="300px" height="65vh" backgroundColor="gray.200" m="8" p={2}>
            <KanbanTask />
        </VStack>
    )
}

export default KanbanCanvas
import KanbanCanvas from '@/components/ui/KanbanCanvas'
import { Box, Center, HStack, Heading } from '@chakra-ui/react'
import React from 'react'

const KanbanView = () => {
    return (
        <Box>
            <HStack p={3} borderBottom="1px" borderColor={"gray.300"}>
                <Center>
                    <Heading size="lg" as={"h3"} lineHeight="1" fontWeight="normal" >Kanban View</Heading>
                </Center>
            </HStack>
            <KanbanCanvas />
        </Box>
    )
}

export default KanbanView
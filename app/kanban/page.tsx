import KanbanCanvas from '@/components/ui/KanbanCanvas'
import { Box, Flex, Heading } from '@chakra-ui/react'

const KanbanView = () => {
    return (
        <Box>
            <Heading size="lg" as={"h3"} lineHeight="1" fontWeight="normal" borderBottom="1px" p={3} borderColor={"gray.300"}>Kanban View</Heading>
            <Flex className='max-md:flex-col' overflowX={'scroll'} minHeight={"100%"}>
                <KanbanCanvas />
            </Flex>
        </Box>
    )
}

export default KanbanView
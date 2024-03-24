import KanbanCanvas from '@/components/ui/KanbanCanvas'
import { Box, Heading } from '@chakra-ui/react'

const KanbanView = () => {
    return (
        <Box>
            <Heading size="lg" as={"h3"} lineHeight="1" fontWeight="normal" borderBottom="1px" p={3} borderColor={"gray.300"}>Kanban View</Heading>
            <Box className='h-[100vh] overflow-scroll'>
                <KanbanCanvas />
            </Box>
        </Box>
    )
}

export default KanbanView
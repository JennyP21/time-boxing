import KanbanCanvas from '@/components/ui/KanbanCanvas'
import { Box, Flex, Heading } from '@chakra-ui/react'

const KanbanView = () => {
    return (
        <Flex className='w-full h-full flex-col'>
            <Heading size="lg" as={"h3"} lineHeight="1" fontWeight="normal" borderBottom="1px" p={3} borderColor={"gray.300"}>Kanban View</Heading>
            <Box className='overflow-x-scroll overflow-y-hidden flex-[1_0_0]'>
                <KanbanCanvas />
            </Box>
        </Flex>
    )
}

export default KanbanView
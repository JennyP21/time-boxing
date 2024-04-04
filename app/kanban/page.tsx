import KanbanCanvas from '@/app/kanban/KanbanCanvas'
import { Box, Flex } from '@chakra-ui/react'
import KanbanHeader from './KanbanHeader'

const KanbanView = () => {
    return (
        <Flex className='w-full h-full flex-col'>
            <KanbanHeader />
            <Box className='overflow-x-scroll overflow-y-hidden flex-[1_0_0]'>
                <KanbanCanvas />
            </Box>
        </Flex>
    )
}

export default KanbanView
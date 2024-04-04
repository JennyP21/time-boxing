import { HStack, Heading } from '@chakra-ui/react'
import GroupBySelector from './GroupBySelector'

const KanbanHeader = () => {
    return (
        <HStack className='w-full justify-between' borderBottom="1px" p={1} borderColor={"gray.300"}>
            <Heading size="lg" as={"h3"} fontWeight="normal">Kanban View</Heading>
            <HStack>
                <GroupBySelector />
            </HStack>
        </HStack>
    )
}

export default KanbanHeader
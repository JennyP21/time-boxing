import { HStack, Heading } from '@chakra-ui/react'
import ListByStatus from './ListByStatus'

const ListHeader = () => {
    return (
        <HStack className='w-full justify-between items-center' borderBottom="1px" p={1} borderColor={"gray.300"}>
            <Heading size="lg" as={"h3"} fontWeight="normal">List View</Heading>
            <HStack>
                <ListByStatus />
            </HStack>
        </HStack>
    )
}

export default ListHeader
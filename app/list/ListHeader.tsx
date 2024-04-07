import { HStack, Heading } from '@chakra-ui/react'
import React from 'react'

const ListHeader = () => {
    return (
        <HStack className='w-full justify-between' borderBottom="1px" p={1} borderColor={"gray.300"}>
            <Heading size="lg" as={"h3"} fontWeight="normal">List View</Heading>
        </HStack>
    )
}

export default ListHeader
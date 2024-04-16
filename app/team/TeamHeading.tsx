import { Heading } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

const TeamHeading = ({ children }: PropsWithChildren) => {
    return (
        <Heading className='p-3' size="lg" fontWeight="semibold" borderBottom="1px" borderColor="gray.200">
            {children}
        </Heading>
    )
}

export default TeamHeading
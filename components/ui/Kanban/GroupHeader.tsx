import { Heading } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

const GroupHeader = ({ children }: PropsWithChildren) => {
    return (
        <Heading textAlign="start" fontWeight="normal" w="100%" size="medium">{children}</Heading>
    )
}

export default GroupHeader
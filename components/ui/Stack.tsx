import { VStack } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

const Stack = ({ children }: PropsWithChildren) => {
    return (
        <VStack className='overflow-y-scroll' minWidth="280px" maxWidth="300px" ml={2} px={1}>
            {children}
        </VStack>
    )
}

export default Stack
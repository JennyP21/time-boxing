import { Heading } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

const ChartHeading = ({ children }: PropsWithChildren) => {
    return (
        <Heading className='text-center w-full border-b py-1' size='md' color='teal' borderColor='gray.300'>
            {children}
        </Heading>
    )
}

export default ChartHeading
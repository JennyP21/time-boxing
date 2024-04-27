import { PropsWithChildren } from 'react'
import { Text } from '@chakra-ui/react'

const CustomError = ({ children }: PropsWithChildren) => {
    return (
        <Text fontSize="small" textColor='red.400' alignSelf="start">{children}</Text>
    )
}

export default CustomError
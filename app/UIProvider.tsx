"use client"
import { ChakraProvider } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

const UIProvider = ({ children }: PropsWithChildren) => {
    return (
        <ChakraProvider>{children}</ChakraProvider>
    )
}

export default UIProvider
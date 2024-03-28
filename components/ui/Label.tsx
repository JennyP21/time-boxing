import { Box } from '@chakra-ui/react'
import React from 'react'

interface Props {
    labels: string[]
}

const Label = ({ labels }: Props) => {
    return (
        <>
            {labels.map((label, index) => (
                <Box as={"span"} className='rounded-md text-xs p-1' bg={"gray.300"} key={index}>{label}</Box>
            ))}
        </>
    )
}

export default Label
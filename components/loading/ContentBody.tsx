import { Box } from '@chakra-ui/react'
import React from 'react'
import Skeleton from "./Skeleton";

const ContentBody = () => {
    return (
        <Box className='overflow-x-scroll overflow-y-hidden flex-[1_0_0] p-1'>
            <Skeleton height="100%" />
        </Box>
    )
}

export default ContentBody
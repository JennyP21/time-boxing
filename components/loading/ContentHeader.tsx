import { Box } from '@chakra-ui/react'
import React from 'react'
import Skeleton from "./Skeleton";

const ContentHeader = () => {
    return (
        <Box p={1}>
            <Skeleton height={40} />
        </Box>
    )
}

export default ContentHeader
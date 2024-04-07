import { Box, Flex } from '@chakra-ui/react'
import ListHeader from './ListHeader'
import ListTable from './ListTable'

const ListView = () => {

    return (
        <Flex className='w-full h-full flex-col'>
            <ListHeader />
            <Box className='overflow-x-scroll overflow-y-hidden flex-[1_0_0]'>
                <ListTable />
            </Box>
        </Flex>
    )
}

export default ListView
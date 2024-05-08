import { Flex } from '@chakra-ui/react'
import React from 'react'
import Hero from './Hero'

const Home = () => {
    return (
        <Flex className='flex-col mt-16 gap-5 overflow-y-auto'>
            <Hero />
        </Flex>
    )
}

export default Home
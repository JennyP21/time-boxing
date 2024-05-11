import { Divider, Flex } from '@chakra-ui/react'
import React from 'react'
import Hero from './Hero'
import Features from './Features'

const Home = () => {
    return (
        <Flex className='flex-col mt-16 gap-5 overflow-y-auto'>
            <Hero />
            <Features />
        </Flex>
    )
}

export default Home
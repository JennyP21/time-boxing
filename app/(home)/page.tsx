import { Flex } from '@chakra-ui/react'
import Features from './Features'
import Hero from './Hero'

const Home = () => {
    return (
        <Flex className='flex-col mt-16 gap-5 overflow-y-auto'>
            <Hero />
            <Features />
        </Flex>
    )
}

export default Home
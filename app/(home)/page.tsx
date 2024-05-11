import { Flex } from '@chakra-ui/react'
import Features from './Features'
import Hero from './Hero'
import Reviews from './Reviews'

const Home = () => {
    return (
        <Flex className='flex-col mt-16 overflow-y-auto'>
            <Hero />
            <Features />
            <Reviews />
        </Flex>
    )
}

export default Home
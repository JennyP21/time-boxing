import { Divider, Flex } from '@chakra-ui/react'
import Features from './Features'
import Hero from './Hero'
import Reviews from './Reviews'
import Price from './Price'

const Home = () => {
    return (
        <Flex className='flex-col mt-16 overflow-y-auto'>
            <Hero />
            <Divider />
            <Features />
            <Divider />
            <Reviews />
            <Divider />
            <Price />
        </Flex>
    )
}

export default Home
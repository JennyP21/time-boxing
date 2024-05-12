import { Divider, Flex } from '@chakra-ui/react'
import Features from './Features'
import Hero from './Hero'
import Reviews from './Reviews'
import Price from './Price'
import Footer from './Footer'

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
            <Divider />
            <Footer />
        </Flex>
    )
}

export default Home
import { Box, Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import Image from 'next/image';

const Hero = () => {
    return (
        <SimpleGrid
            className='flex-col w-full p-10 items-center gap-8 mx-auto'
            columns={{ sm: 1, md: 2 }}
            backgroundColor="teal.400"
            style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 50% 90%, 15% 100%, 0 85%, 0% 30%)'
            }}
        >
            <Flex className='flex-col gap-3 text-slate-100'>
                <Heading textAlign="end" size="lg">
                    Who<br /> Unify tasks, teams, and triumphs?
                </Heading>
                <Heading textAlign="end" size="md">- Its Time Boxing.</Heading>
            </Flex>
            <Box>
                <Image src="/images/hero.webp" width={500} height={350} alt='Hero image' />
            </Box>
        </SimpleGrid>
    )
}

export default Hero
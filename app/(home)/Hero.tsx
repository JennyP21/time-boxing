import { Box, Flex, Grid, Heading } from '@chakra-ui/react';
import Image from 'next/image';

const Hero = () => {
    return (
        <Grid
            className='flex-col w-full py-20 px-32 items-center justify-center'
            templateColumns={{ sm: "1fr", md: '1fr 1fr' }}
            backgroundColor="blue.400"
            style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 50% 90%, 15% 100%, 0 85%, 0% 30%)'
            }}
        >
            <Flex className='flex-col gap-3 text-slate-100'>
                <Heading textAlign="end" size="lg">
                    Who Unify <br />Tasks, Teams, and Triumphs?
                </Heading>
                <Heading textAlign="end" size="md">- Its Time Boxing.</Heading>
            </Flex>
            <Box>
                <Image src="/images/hero.webp" width={600} height={450} alt='Hero image' />
            </Box>
        </Grid>
    )
}

export default Hero
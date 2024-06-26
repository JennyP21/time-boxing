import SignUpButton from '@/components/ui/SignUpButton';
import { Box, Flex, Grid, Heading } from '@chakra-ui/react';
import Image from 'next/image';

const Hero = () => {
    return (
        <Grid
            className='flex-col w-full py-20 items-center justify-center'
            templateColumns={{ sm: "1fr", md: '1fr 1fr' }}
            px={{ base: "0", sm: "2rem", md: "7rem", xl: "10rem" }}
            bgGradient="linear(to-bl, blue.500, blue.200)"
        >
            <Flex className='flex-col gap-3 text-slate-100 justify-center items-center'>
                <Heading textAlign="center" size={{ base: "lg", md: "xl" }}>
                    Unify Tasks, Unleash Potential. Achieve More.<br /> Start Now!
                </Heading>
                <Box>
                    <SignUpButton color='red' size='large' />
                </Box>
            </Flex>
            <Box>
                <Image src="/images/hero.webp" className='mx-auto' width={600} height={450} alt='Hero image' />
            </Box>
        </Grid>
    )
}

export default Hero
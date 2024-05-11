import SignUpButton from '@/components/ui/SignUpButton';
import { Box, Flex, Grid, Heading } from '@chakra-ui/react';
import Image from 'next/image';

const Hero = () => {
    return (
        <Grid
            className='flex-col w-full py-20 px-28 items-center justify-center'
            templateColumns={{ sm: "1fr", md: '1fr 1fr' }}
            bgGradient="linear(to-bl, blue.500, blue.200)"
        >
            <Flex className='flex-col gap-3 text-slate-100 justify-center items-center'>
                <Heading textAlign="center">
                    Unify Tasks, Unleash Potential. Achieve More.<br /> Start Now!
                </Heading>
                <Box>
                    <SignUpButton />
                </Box>
            </Flex>
            <Box>
                <Image src="/images/hero.webp" width={600} height={450} alt='Hero image' />
            </Box>
        </Grid>
    )
}

export default Hero
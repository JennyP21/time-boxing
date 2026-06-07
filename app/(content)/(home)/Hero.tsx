import SignUpButton from '@/components/ui/SignUpButton';
import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react';
import Image from 'next/image';

const Hero = () => {
    return (
        <Grid
            className='w-full py-24 items-center justify-center'
            templateColumns={{ base: "1fr", md: '1.2fr 0.8fr' }}
            gap={8}
            px={{ base: "4", sm: "8", md: "16", xl: "24" }}
            bgGradient="linear(to-br, #0f172a, #1e1b4b)"
            color="white"
        >
            <Flex className='flex-col gap-6 text-left items-start max-w-2xl'>
                <Heading className='tracking-tight leading-none font-extrabold' size={{ base: "xl", md: "2xl" }}>
                    Unify Tasks. Unleash Potential. <Text as="span" bgGradient="linear(to-r, #a5b4fc, #f472b6)" bgClip="text">Achieve More.</Text>
                </Heading>
                <Text fontSize={{ base: "md", md: "lg" }} className='text-slate-300 font-light leading-relaxed'>
                    Block your time, structure your projects, and collaborate with your team in one beautifully crafted, high-performance workspace.
                </Text>
                <Box className='hover:scale-105 transition-transform duration-200'>
                    <SignUpButton color='blue' size='large' />
                </Box>
            </Flex>
            <Box className='relative w-full h-full flex justify-center items-center'>
                <Box className='absolute w-72 h-72 bg-indigo-500 rounded-full filter blur-[80px] opacity-20 -top-10 -left-10'></Box>
                <Image src="/images/hero.webp" className='mx-auto rounded-2xl shadow-2xl relative z-10 border border-slate-700/50' width={600} height={450} alt='Hero image' priority />
            </Box>
        </Grid>
    )
}

export default Hero
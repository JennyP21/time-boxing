import Logo from '@/components/ui/Logo'
import SignUpButton from '@/components/ui/SignUpButton'
import { Flex, Grid } from '@chakra-ui/react'
import { getServerSession } from 'next-auth'
import FooterLinks from './FooterLinks'
import FooterSocial from './FooterSocial'

const Footer = async () => {
    const session = await getServerSession();
    return (
        <Grid className='py-10 px-30 bg-black text-white' templateColumns={{ sm: "1fr", md: "repeat(2, 1fr)" }} justifyItems="center" alignItems="center">
            <Flex className='flex-col items-center justify-center'>
                <Logo />
                {session && session.user ? <FooterLinks /> : <SignUpButton />}
            </Flex>
            <FooterSocial />
        </Grid>
    )
}

export default Footer
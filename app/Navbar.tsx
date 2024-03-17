import Logo from '@/components/ui/Logo'
import NavLinks from '@/components/ui/NavLinks'
import { Box, Flex } from '@chakra-ui/react'
import { getServerSession } from 'next-auth';

const Navbar = async () => {

    const session = await getServerSession();

    return (
        <Box as="nav" borderBottom="1px" borderColor={'gray.300'}>
            <Flex p={{ sm: 2, base: 1 }} justify={'space-between'}>
                <Logo />
                <NavLinks session={session} />
            </Flex >
        </Box >
    )
}

export default Navbar
import Logo from '@/components/ui/Logo';
import NavLinks from '@/components/ui/NavLinks';
import { Box, Flex } from '@chakra-ui/react';
import { getServerSession } from 'next-auth';

const Navbar = async () => {
    const session = await getServerSession();

    return (
        <Box as="nav" borderBottom="1px" borderColor={'gray.300'} width='100%' height="fit-content">
            <Flex py={{ sm: 2, base: 0.5 }} px={2} justify={'space-between'}>
                <Logo />
                <NavLinks session={session} />
            </Flex >
        </Box >
    )
}

export default Navbar
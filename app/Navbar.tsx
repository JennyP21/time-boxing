import Logo from '@/components/ui/Logo';
import NavLinks from '@/components/ui/NavLinks';
import NavLinksWithUser from '@/components/ui/NavLinksWithUser';
import { Box, Flex } from '@chakra-ui/react';
import { getServerSession } from 'next-auth';
import MobileLeftPanel from './(content)/(main)/MobileLeftPanel';

const Navbar = async () => {
    const session = await getServerSession();
    return (
        <Box as="nav" className='z-50 w-full fixed bg-white' borderBottom="1px" borderColor={'gray.300'}>
            <Flex py={2} px={2} justify={'space-between'}>
                <Flex className='gap-3 justify-center items-center mx-2'>
                    <MobileLeftPanel />
                    <Logo />
                </Flex>
                {session ?
                    <NavLinksWithUser email={session.user.email!} />
                    :
                    <NavLinks />
                }
            </Flex >
        </Box >
    )
}

export default Navbar
import Logo from '@/components/ui/Logo'
import NavLinks from '@/components/ui/NavLinks'
import { Box, Button, Flex, Stack } from '@chakra-ui/react'

const Navbar = () => {
    return (
        <Box as="nav" borderBottom="1px" borderColor={'gray.300'}>
            <Flex p={{ sm: 2, base: 1 }} justify={'space-between'}>
                <Logo />
                <NavLinks />
            </Flex >
        </Box >
    )
}

export default Navbar
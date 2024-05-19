"use client"
import { Link } from '@chakra-ui/next-js';
import { Button, Stack } from '@chakra-ui/react';
import SignUpButton from './SignUpButton';

const NavLinks = () => {
    return (
        <Stack
            direction={'row'}
            spacing="1"
            alignItems={'center'}
        >
            <Button size={{ base: "sm", sm: "md" }} fontWeight={400} variant={'link'}>
                <Link href="/user/signin">Sign In</Link>
            </Button>
            <SignUpButton color='blue' size='normal' />
        </Stack>
    )
}

export default NavLinks
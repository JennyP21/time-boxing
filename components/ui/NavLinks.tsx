import { Button, Center, Link, Menu, MenuButton, MenuItem, MenuList, Stack } from '@chakra-ui/react';
import { Session } from 'next-auth';
import Image from 'next/image';

const NavLinks = ({ session }: { session: Session | null }) => {
    return (
        <>
            {session ?
                <Center>
                    <Menu>
                        <MenuButton as={Button} borderRadius="50%" colorScheme='gray' minWidth={{ base: 10 }} minHeight={{ base: 10 }} overflow={'hidden'}>
                            <Image src={session.user.image || "/fallback-user.webp"} fill className='object-cover' alt="profile" />
                        </MenuButton>
                        <MenuList fontSize={{ sm: "medium", base: "small" }}>
                            <MenuItem>Profile</MenuItem>
                            <MenuItem>Settings</MenuItem>
                            <MenuItem href='/api/auth/signout' as={'a'}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </Center>
                :
                <Stack
                    direction={'row'}
                    spacing="1"
                    alignItems={'center'}
                >
                    <Button size={{ sm: "md", base: "sm" }} fontWeight={400} variant={'link'}>
                        <Link href="/api/auth/signin">Sign In</Link>
                    </Button>
                    <Button
                        size={{ sm: "md", base: "sm" }}
                        fontWeight={600}
                        colorScheme='blue'
                    >
                        Sign Up
                    </Button>
                </Stack>
            }
        </>
    )
}

export default NavLinks
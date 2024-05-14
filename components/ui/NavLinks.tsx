"use client"
import { UserI } from '@/interfaces';
import { Link } from '@chakra-ui/next-js';
import { Button, Center, HStack, Menu, MenuButton, MenuItem, MenuList, Stack, useDisclosure } from '@chakra-ui/react';
import { Session } from 'next-auth';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Profile from './Profile';
import SignUpButton from './SignUpButton';

const NavLinks = ({ session }: { session: Session | null }) => {
    const currPath = usePathname();
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            {session ?
                <Center>
                    <HStack>
                        <Button colorScheme='blue' variant="outline" size="sm">
                            <Link href={currPath === '/' ? '/dashboard' : '/'}>{currPath === '/' ? 'Dashboard' : 'Home'}</Link>
                        </Button>
                        <Menu>
                            <MenuButton as={Button} borderRadius="50%" colorScheme='gray' minWidth={{ base: 10 }} minHeight={{ base: 10 }} overflow={'hidden'}>
                                <Image src={session.user.image || "/fallback-user.webp"} fill className='object-cover' alt="profile" />
                            </MenuButton>
                            <MenuList fontSize={{ sm: "medium", base: "small" }}>
                                <MenuItem onClick={onOpen}>Profile</MenuItem>
                                <MenuItem href='/api/auth/signout' as={'a'}>Logout</MenuItem>
                            </MenuList>
                        </Menu>
                    </HStack>
                    {<Profile user={session.user as UserI} onClose={onClose} isOpen={isOpen} />}
                </Center>
                :
                <Stack
                    direction={'row'}
                    spacing="1"
                    alignItems={'center'}
                >
                    <Button size={{ sm: "md", base: "sm" }} fontWeight={400} variant={'link'}>
                        <Link href="/user/signin">Sign In</Link>
                    </Button>
                    <SignUpButton color='blue' size='normal' />
                </Stack>
            }
        </>
    )
}

export default NavLinks
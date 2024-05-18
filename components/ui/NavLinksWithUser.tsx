"use client"
import { getUserError } from '@/constants';
import { useGetUserByIdQuery } from '@/lib/features/userApi';
import { Link } from '@chakra-ui/next-js';
import { Button, Center, HStack, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from '@chakra-ui/react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { handleErrors } from '../utils/handleErrors';
import Profile from './Profile';

const NavLinksWithUser = ({ email }: { email: string }) => {
    const currPath = usePathname();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data: user, error } = useGetUserByIdQuery(email);
    if (error) handleErrors(error, getUserError.type);
    if (!user) return null;

    return (
        <Center>
            <HStack>
                <Button colorScheme='blue' variant="outline" size="sm">
                    <Link href={currPath === '/' ? '/dashboard' : '/'}>{currPath === '/' ? 'Dashboard' : 'Home'}</Link>
                </Button>
                <Menu>
                    <MenuButton as={Button} borderRadius="50%" colorScheme='gray' minWidth={{ base: 10 }} minHeight={{ base: 10 }} overflow={'hidden'}>
                        <Image src={user.image || "/fallback-user.webp"} fill className='object-cover' alt="profile" />
                    </MenuButton>
                    <MenuList fontSize={{ sm: "medium", base: "small" }}>
                        <MenuItem onClick={onOpen}>Profile</MenuItem>
                        <MenuItem href='/api/auth/signout' as={'a'}>Logout</MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
            <Profile user={user} isOpen={isOpen} onClose={onClose} />
        </Center>
    )
}

export default NavLinksWithUser